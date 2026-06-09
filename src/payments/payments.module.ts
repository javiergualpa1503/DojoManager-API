import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Membership } from '../memberships/entities/membership.entity';
import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [TypeOrmModule.forFeature([Payment, Membership])],
})
export class PaymentsModule {}
