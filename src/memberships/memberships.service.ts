import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { Membership } from './entities/membership.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createMembershipDto: CreateMembershipDto): Promise<Membership> {
    const { studentId, amount, month, year } = createMembershipDto;

    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException(`Student ${studentId} not found`);
    }

    const membershipExists = await this.membershipRepository.findOne({
      where: {
        student: { id: studentId },
        month,
        year,
      },
    });

    if (membershipExists) {
      throw new BadRequestException('Membership already exists for this month');
    }

    const membership = this.membershipRepository.create({
      student,
      amount,
      month,
      year,
    });

    return this.membershipRepository.save(membership);
  }
}
