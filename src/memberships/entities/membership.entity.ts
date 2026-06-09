import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MembershipStatus } from '../../common/enums/membership-status.enum';
import { Payment } from '../../payments/entities/payment.entity';
import { Student } from '../../students/entities/student.entity';

@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.memberships, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column('decimal')
  amount: number;

  @Column({
    type: 'enum',
    enum: MembershipStatus,
    default: MembershipStatus.PENDING,
  })
  status: MembershipStatus;

  @OneToMany(() => Payment, (payment) => payment.membership)
  payments: Payment[];
}
