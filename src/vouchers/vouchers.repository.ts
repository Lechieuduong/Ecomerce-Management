import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateVoucherDto } from "./dto/create-voucher.dto";
import { Voucher } from "./entity/voucher.entity";


const dateNow = new Date();

@EntityRepository(Voucher)
export class VoucherRepository extends Repository<Voucher> {
    async createVoucher(createVoucherDtto: CreateVoucherDto) {
        try {
            const { created_date, valid_until } = createVoucherDtto;
            const start = new Date(created_date);
            const end = new Date(valid_until);
            if (start.getTime() < dateNow.getTime())
                return {
                    code: 404,
                    message: 'Start time is not smaller than now',
                };

            if (end.getTime() < start.getTime())
                return {
                    code: 404,
                    message: 'End time is not smaller than start time',
                };

            const voucher = await this.create({
                ...createVoucherDtto,
            });

            await this.save(voucher);
            return {
                code: 200,
                message: 'Create voucher successful',
                voucher
            };
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Server error');
        }
    }
}