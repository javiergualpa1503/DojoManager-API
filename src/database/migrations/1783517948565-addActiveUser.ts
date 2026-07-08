import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActiveUser1783517948565 implements MigrationInterface {
    name = 'AddActiveUser1783517948565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
    }

}
