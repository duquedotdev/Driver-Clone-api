import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateRecoveryTable1631070569398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account_recovery',
        columns: [
          { name: 'id', type: 'bigint', isGenerated: true, isPrimary: true, generationStrategy: 'increment' },
          { name: 'account_id', type: 'bigint', isNullable: true },
          { name: 'code', type: 'varchar' },
          { name: 'ip_address', type: 'varchar' },
          { name: 'checked', type: 'boolean', default: false },

          { name: 'expires_in', type: 'timestamp' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
          { name: 'deleted_at', type: 'timestamp', default: null, isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'account_recovery',
      new TableForeignKey({
        name: 'account_recovery_fk',
        columnNames: ['account_id'],
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('account_recovery', 'account_recovery_fk');
    await queryRunner.dropTable('account_recovery');
  }
}
