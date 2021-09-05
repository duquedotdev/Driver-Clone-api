import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AccountRoles1625928374369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          { name: 'id', type: 'int', isGenerated: true, isPrimary: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar', isNullable: true },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
          { name: 'access', type: 'boolean', default: false },

          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
          { name: 'deleted_at', type: 'timestamp', default: null, isNullable: true },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          { name: 'id', type: 'int', isGenerated: true, isPrimary: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar' },
          { name: 'initials', type: 'varchar', isUnique: true },

          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role');
    await queryRunner.dropTable('accounts');
  }
}
