import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn, DeleteDateColumn, ManyToOne,
} from 'typeorm';
import {User} from "../../auth/entities/user.entity";

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

    @ManyToOne(type => User, user=>user.reviews, {eager: false})
    user: User
}