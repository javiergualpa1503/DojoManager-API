import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Enrollment } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

import { Student } from '../students/entities/student.entity';
import { Class } from '../classes/entities/class.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}

  async create(dto: CreateEnrollmentDto) {
    const student = await this.studentRepo.findOne({
      where: { id: dto.studentId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const cls = await this.classRepo.findOne({
      where: { id: dto.classId },
    });

    if (!cls) {
      throw new NotFoundException('Class not found');
    }

    const exists = await this.enrollmentRepo.findOne({
      where: {
        student: { id: dto.studentId },
        class: { id: dto.classId },
      },
    });

    if (exists) {
      throw new BadRequestException('Student already enrolled in this class');
    }

    const enrollment = this.enrollmentRepo.create({
      student,
      class: cls,
    });

    return await this.enrollmentRepo.save(enrollment);
  }

  findAll() {
    return this.enrollmentRepo.find({
      relations: {
        student: true,
        class: true,
      },
    });
  }

  findOne(id: string) {
    return this.enrollmentRepo.findOne({
      where: { id },
      relations: {
        student: true,
        class: true,
      },
    });
  }

  async remove(id: string) {
    const enrollment = await this.findOne(id);

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return this.enrollmentRepo.remove(enrollment);
  }
}
