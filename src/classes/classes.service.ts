import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const instructor = await this.userRepository.findOne({
      where: {
        id: createClassDto.instructorId,
      },
    });

    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    const classEntity = this.classRepository.create({
      name: createClassDto.name,
      description: createClassDto.description,
      capacity: createClassDto.capacity,
      instructor,
    });

    return this.classRepository.save(classEntity);
  }

  async findAll(): Promise<Class[]> {
    return this.classRepository.find({
      relations: {
        instructor: true,
      },
    });
  }

  async findOne(id: string): Promise<Class> {
    const classEntity = await this.classRepository.findOne({
      where: { id },
      relations: {
        instructor: true,
      },
    });

    if (!classEntity) {
      throw new NotFoundException(`Class ${id} not found`);
    }

    return classEntity;
  }

  async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
    const classEntity = await this.findOne(id);

    if (updateClassDto.instructorId) {
      const instructor = await this.userRepository.findOne({
        where: {
          id: updateClassDto.instructorId,
        },
      });

      if (!instructor) {
        throw new NotFoundException('Instructor not found');
      }

      classEntity.instructor = instructor;
    }

    Object.assign(classEntity, updateClassDto);

    return this.classRepository.save(classEntity);
  }

  async remove(id: string): Promise<void> {
    const classEntity = await this.findOne(id);

    await this.classRepository.remove(classEntity);
  }
}
