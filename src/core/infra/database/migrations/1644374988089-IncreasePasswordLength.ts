import {MigrationInterface, QueryRunner} from "typeorm";

export class IncreasePasswordLength1644374988089 implements MigrationInterface {
    name = "IncreasePasswordLength1644374988089";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE profile ALTER COLUMN password TYPE varchar(100)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE profile ALTER COLUMN password TYPE varchar(50)`
        );
    }
}
