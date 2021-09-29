import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Account from './Account';

@Entity('account_recovery')
export default class account_recovery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_id: number;

  @Column()
  code: string;

  @Column()
  ip_address: string;

  @Column()
  checked: boolean;

  @Column()
  expires_in: Date;

  @ManyToMany(() => Account)
  @JoinTable({
    name: 'accounts',
    joinColumn: {
      name: 'id',
    },
    inverseJoinColumn: {
      name: 'account_id',
    },
  })
  account: Account[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
