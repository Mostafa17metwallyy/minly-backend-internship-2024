import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDirectorsTable1720428478570 implements MigrationInterface {
    name = 'CreateDirectorsTable1720428478570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "directors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "birthDate" character varying NOT NULL, CONSTRAINT "PK_a9ae28f00c93801aa034a2c1773" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "directors"`);
    }

}
