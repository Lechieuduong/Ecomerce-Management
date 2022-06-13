import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { CategoryStatus } from "../enum/category-status.enum";

@Entity({ name: 'Category' })
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name?: string;

    @Column()
    banner?: string;

    @Column({ unique: true })
    position?: number;

    @Column({ default: CategoryStatus.INACTIVE })
    status: CategoryStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}