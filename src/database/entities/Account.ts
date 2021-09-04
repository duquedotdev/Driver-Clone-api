import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import Role from './Role';

@Entity('accounts')
export default class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  access: number;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'account_role',
    joinColumn: {
      name: 'account_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

  // @Exclude()
  // @CreateDateColumn()
  // created: Date;
}
