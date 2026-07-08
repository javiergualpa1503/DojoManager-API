import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';

import { Student } from '../../students/entities/student.entity';
import { Class } from '../../classes/entities/class.entity';

@Entity('enrollments')
@Unique(['student', 'class'])
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'student_id',
  })
  student: Student;

  @ManyToOne(() => Class, (classEntity) => classEntity.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'class_id',
  })
  class: Class;

  @CreateDateColumn()
  createdAt: Date;
}
