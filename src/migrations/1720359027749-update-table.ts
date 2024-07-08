import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1720359027749 implements MigrationInterface {
    name = 'UpdateTable1720359027749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "rating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "movie_poster" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "movie_poster"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "rating"`);
    }

}
