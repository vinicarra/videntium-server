import { MigrationInterface, QueryRunner } from "typeorm";
import { sql, dropSql } from "./raw/initialSql";

export class Test1640897551609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(dropSql);
  }
}
