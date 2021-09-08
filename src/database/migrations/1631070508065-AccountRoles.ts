import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AccountRoles1631070508065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          { name: 'id', type: 'bigint', isGenerated: true, isPrimary: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar' },
          { name: 'initials', type: 'varchar', isUnique: true },

          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
  }
}
