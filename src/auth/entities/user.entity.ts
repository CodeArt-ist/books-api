import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import has = Reflect.has;

@Entity()
export class User {
  @Column({ nullable: true })
  deleted_at: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  birthday: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}