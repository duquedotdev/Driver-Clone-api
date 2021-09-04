import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import * as Crypto from 'crypto';

const email = 'admin@email.com';
const password = Crypto.createHash('sha1').update('@123A123b').digest('hex');

export class CreateManyToManyAccountRole1625931099292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account_role',
        columns: [
          { name: 'account_id', type: 'int', isNullable: true },
          { name: 'role_id', type: 'int', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKeys('account_role', [
      new TableForeignKey({
        name: 'account_fk',
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accounts',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'role_fk',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);

    await queryRunner.query(` INSERT INTO role (name, initials) VALUES ('Administrador', 'ADM'), ('Usuario', 'USER') `);

    await queryRunner.query(
      ` INSERT INTO accounts (name, email, password) VALUES ('admin', '${email}', '${password}') `,
    );

    await queryRunner.query(
      ` INSERT INTO account_role
       (account_id, role_id) VALUES
       ( (SELECT id FROM accounts WHERE email = '${email}'),
       (SELECT id FROM role WHERE initials = 'ADM') ),
       ( (SELECT id FROM accounts WHERE email = '${email}'),
       (SELECT id FROM role WHERE initials = 'USER') )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM account_role WHERE account_id = (SELECT id FROM accounts WHERE email = 'admin@email.com')`,
    );
    await queryRunner.query(`DELETE FROM role WHERE id = (SELECT id FROM role WHERE initials = 'ADM')`);
    await queryRunner.query(`DELETE FROM role WHERE id = (SELECT id FROM role WHERE initials = 'USER')`);
    await queryRunner.query(`DELETE FROM account WHERE id = (SELECT id FROM account WHERE email = 'admin@email.com')`);
    await queryRunner.dropTable('account_role');
  }
}
