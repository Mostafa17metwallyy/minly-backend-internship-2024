import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable31720361245258 implements MigrationInterface {
    name = 'UpdateTable31720361245258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "rating" numeric(2,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "rating" integer NOT NULL`);
    }

}
