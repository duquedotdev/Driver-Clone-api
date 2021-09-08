import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAccount1631070488396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          { name: 'id', type: 'bigint', isGenerated: true, isPrimary: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar', isNullable: true },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
          { name: 'access', type: 'boolean', default: false },
          { name: 'active', type: 'boolean', default: false },

          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
          { name: 'deleted_at', type: 'timestamp', default: null, isNullable: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts');
  }
}
