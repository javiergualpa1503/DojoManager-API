import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Membership } from '../../memberships/entities/membership.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    nullable: true,
  })
  phone!: string;

  @Column({
    nullable: true,
  })
  email!: string;

  @Column({
    nullable: true,
  })
  address!: string;

  @Column({
    nullable: true,
  })
  dateOfBirth!: Date;

  @Column({
    nullable: true,
  })
  emergencyContact!: string;

  @Column({
    default: true,
  })
  active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(() => Membership, (membership) => membership.student)
  memberships: Membership[];
}
