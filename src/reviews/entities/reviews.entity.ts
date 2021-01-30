import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn, DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Reviews {
    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    read_book_id: number;

    @Column()
    description: string;

    @Column()
    rate: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}