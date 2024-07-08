import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable41720361674317 implements MigrationInterface {
    name = 'UpdateTable41720361674317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "rating" TYPE numeric(3,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "rating" TYPE numeric(2,2)`);
    }

}
