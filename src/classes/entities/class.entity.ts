import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  capacity: number;

  @Column({
    default: true,
  })
  active: boolean;

  @ManyToOne(() => User, (user) => user.classes, {
    nullable: false,
  })
  @JoinColumn({
    name: 'instructor_id',
  })
  instructor: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.class)
  enrollments: Enrollment[];
}
