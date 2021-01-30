import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Book {
  @DeleteDateColumn()
  deleted_at: Date

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isbn: string

  @Column()
  category: string

  @Column()
  author: string

  @Column()
  publisher: string

  @Column()
  image: string

  @Column()
  description: string

  @Column()
  page_count: string

  @Column()
  google_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}