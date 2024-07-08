import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMoviesTable51720439401324 implements MigrationInterface {
    name = 'UpdateMoviesTable51720439401324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "trailer" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "createdAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "updatedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "uuId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_5da6d1a49df448c09ddf3cee372" PRIMARY KEY ("id", "uuId")`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "actor_id" integer`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "moviePoster" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "FK_4faabcb28eb548caa2404261e4f" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "FK_4faabcb28eb548caa2404261e4f"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "moviePoster" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "actor_id"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_5da6d1a49df448c09ddf3cee372"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "uuId"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorId"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "trailer"`);
    }

}
