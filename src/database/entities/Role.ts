import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export default class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'initials' })
  initials: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
