import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

import { Membership } from '../memberships/entities/membership.entity';
import { MembershipStatus } from '../common/enums/membership-status.enum';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,

    @InjectRepository(Membership)
    private membershipRepo: Repository<Membership>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const membership = await this.membershipRepo.findOne({
      where: { id: dto.membershipId },
      relations: {
        payments: true,
      },
    });

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    if (membership.status === MembershipStatus.PAID) {
      throw new BadRequestException('Membership already paid');
    }

    // 🔥 Validación de monto (simple versión)
    const totalPaid = membership.payments?.reduce(
      (sum, p) => sum + Number(p.amount),
      0,
    );

    const newTotal = totalPaid + dto.amount;

    if (newTotal > Number(membership.amount)) {
      throw new BadRequestException('Payment exceeds membership amount');
    }

    const payment = this.paymentRepo.create({
      membership,
      amount: dto.amount,
      method: dto.method,
    });

    const saved = await this.paymentRepo.save(payment);

    // 🔥 Si ya pagó todo → marcar como PAID
    if (newTotal === Number(membership.amount)) {
      membership.status = MembershipStatus.PAID;
      await this.membershipRepo.save(membership);
    }

    return saved;
  }

  findAll() {
    return this.paymentRepo.find({
      relations: {
        membership: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.paymentRepo.findOne({
      where: { id },
      relations: {
        membership: true,
      },
    });
  }
}
