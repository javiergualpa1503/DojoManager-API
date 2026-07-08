import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class } from './entities/class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
  imports: [TypeOrmModule.forFeature([Class, User])],
})
export class ClassesModule {}
