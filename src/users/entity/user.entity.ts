//import { Order } from '../../order/entity/order.entity';
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enum/user-role.enum';
import { UserAddress } from './user-address.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    // @Column({ default: 'https://bit.ly/3McoJN1' })
    // avatar: string;

    @Column({ default: Role.User })
    role: string;

    @Column({ default: false })
    verify: boolean;

    @Column({ nullable: true })
    verifyCode: string;

    @Column({ type: 'timestamptz' })
    created_at: Date;

    @Column({ type: 'timestamptz' })
    updated_at: Date;

    @OneToMany(
        (_type) => UserAddress,
        (userAddress) => userAddress.user,
    )
    userAddress: UserAddress[];

    //   @OneToMany((_type) => Order, (order) => order.user)
    //   order: Order[];
}