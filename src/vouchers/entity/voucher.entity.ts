import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { DiscountUnit } from "../enum/discount-unit.enum";

@Entity({ name: 'Voucher' })
export class Voucher extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    voucher_code?: string;

    @Column()
    discount_value?: number;

    @Column('text')
    discount_unit: DiscountUnit;

    @Column('timestamp')
    created_date: Date;

    @Column('timestamp')
    valid_until: Date;

    @Column()
    mininum_order_value: number;

    @Column()
    maximum_discount_amount: number;

    @Column()
    quantity: number;

    @Column({ default: true })
    is_redeem_allowed?: boolean

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}