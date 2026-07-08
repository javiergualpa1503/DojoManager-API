import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Class } from '../../classes/entities/class.entity';
import { UserRole } from '../../common/enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 100,
  })
  name!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    select: false,
  })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Class, (classEntity) => classEntity.instructor)
  classes!: Class[];
}
