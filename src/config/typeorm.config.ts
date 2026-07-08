import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: Number(configService.get<number>('DB_PORT')) || 5432,
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),

  // Esto busca las entidades por ti de forma segura sin importar si es .js o .ts
  autoLoadEntities: true,

  synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
  logging: configService.get<string>('DB_LOGGING') === 'true',

  // Solo dejamos las migraciones mapeadas para cuando corran dentro del ciclo de NestJS
  migrations: [path.join(process.cwd(), 'dist/database/migrations/*.js')],
});
