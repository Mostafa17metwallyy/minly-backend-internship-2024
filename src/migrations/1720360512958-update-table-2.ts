import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable21720360512958 implements MigrationInterface {
    name = 'UpdateTable21720360512958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" RENAME COLUMN "movie_poster" TO "moviePoster"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" RENAME COLUMN "moviePoster" TO "movie_poster"`);
    }

}
