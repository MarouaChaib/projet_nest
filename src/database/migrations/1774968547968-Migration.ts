import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1774968547968 implements MigrationInterface {
    name = 'Migration1774968547968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "handle" varchar NOT NULL, "image" varchar, "registrationToken" varchar, "loginToken" varchar)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
