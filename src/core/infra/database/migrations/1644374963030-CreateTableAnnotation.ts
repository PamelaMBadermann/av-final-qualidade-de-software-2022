import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableAnnotation1644374963030 implements MigrationInterface {
    name = "CreateTableAnnotation1644374963030";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "annotation" ("uid" uuid NOT NULL, "title" character varying(30) NOT NULL, "description" character varying(30) NOT NULL, "startDate" TIMESTAMP, "endDate" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(20), CONSTRAINT "PK_8505f3977d7839dd709ff79f9d7" PRIMARY KEY ("uid"))`
        );
        await queryRunner.query(
            `ALTER TABLE "annotation" ADD CONSTRAINT "FK_c2b460c69608b861ee8de1a2f96" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "annotation" DROP CONSTRAINT "FK_c2b460c69608b861ee8de1a2f96"`
        );
        await queryRunner.query(`DROP TABLE "annotation"`);
    }
}
