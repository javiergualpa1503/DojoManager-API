import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';
import { Membership } from './entities/membership.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { Payment } from '../payments/entities/payment.entity';

@Module({
  controllers: [MembershipsController],
  providers: [MembershipsService],
  imports: [TypeOrmModule.forFeature([Membership, Payment, Student])],
})
export class MembershipsModule {}
