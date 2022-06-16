import { EntityRepository, Repository } from "typeorm";
import { UserAddress } from "./entity/user-address.entity";

@EntityRepository(UserAddress)
export class UserAddressRepository extends Repository<UserAddress> {

}