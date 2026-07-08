import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(
  process.cwd(),
  `.env.${process.env.NODE_ENV || 'development'}`,
);
dotenv.config({ path: envPath });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [path.join(process.cwd(), 'src/**/*.entity.ts')],
  migrations: [path.join(process.cwd(), 'src/database/migrations/*.ts')],
});
