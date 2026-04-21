import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1776790788618 implements MigrationInterface {
    name = 'Migration1776790788618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "content" varchar(500) NOT NULL, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "tokens" ("token" varchar PRIMARY KEY NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "handle" varchar NOT NULL, "image" varchar, "registrationToken" varchar, "loginToken" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_article" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "content" varchar(500) NOT NULL, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer, CONSTRAINT "FK_636f17dadfea1ffb4a412296a28" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_article"("id", "title", "slug", "content", "image", "createdAt", "updatedAt", "userId") SELECT "id", "title", "slug", "content", "image", "createdAt", "updatedAt", "userId" FROM "article"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`ALTER TABLE "temporary_article" RENAME TO "article"`);
        await queryRunner.query(`CREATE TABLE "temporary_tokens" ("token" varchar PRIMARY KEY NOT NULL, "userId" integer, CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tokens"("token", "userId") SELECT "token", "userId" FROM "tokens"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`ALTER TABLE "temporary_tokens" RENAME TO "tokens"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" RENAME TO "temporary_tokens"`);
        await queryRunner.query(`CREATE TABLE "tokens" ("token" varchar PRIMARY KEY NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "tokens"("token", "userId") SELECT "token", "userId" FROM "temporary_tokens"`);
        await queryRunner.query(`DROP TABLE "temporary_tokens"`);
        await queryRunner.query(`ALTER TABLE "article" RENAME TO "temporary_article"`);
        await queryRunner.query(`CREATE TABLE "article" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "content" varchar(500) NOT NULL, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "article"("id", "title", "slug", "content", "image", "createdAt", "updatedAt", "userId") SELECT "id", "title", "slug", "content", "image", "createdAt", "updatedAt", "userId" FROM "temporary_article"`);
        await queryRunner.query(`DROP TABLE "temporary_article"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "article"`);
    }

}
