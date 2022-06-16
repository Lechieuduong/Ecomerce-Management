import { BadRequestException } from "@nestjs/common";
import { ppid } from "process";
import { EntityRepository, Repository } from "typeorm";
import { CreateVoucherDto } from "./dto/create-voucher.dto";
import { UpdateVoucherDto } from "./dto/update-voucher.dto";
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

    async updateVoucher(id: string, updateVoucherDto: UpdateVoucherDto) {
        try {
            const voucher = await this.findOne(id);
            const { created_date, valid_until } = updateVoucherDto;
            const start = new Date(created_date);
            const end = new Date(valid_until);
            const voucherStartTime = new Date(voucher.created_date);
            const voucherEndTime = new Date(voucher.valid_until);
            if (created_date && valid_until) {
                if (start.getTime() < dateNow.getTime())
                    return {
                        code: 404,
                        message: 'Start time is not smaller than now'
                    };

                if (end.getTime() < start.getTime())
                    return {
                        code: 404,
                        message: 'End time is not smaller than start time'
                    };
            }

            if (created_date && !valid_until) {
                if (start.getTime() < dateNow.getTime())
                    return {
                        code: 404,
                        message: 'Start time is not valid',
                    };

                if (start.getTime() > voucherEndTime.getTime())
                    return {
                        code: 404,
                        message: 'Start time is not much than end time',
                    };
            }

            if (valid_until && !created_date) {
                if (end.getTime() < dateNow.getTime())
                    return {
                        code: 404,
                        message: 'End time is not valid',
                    };


                if (end.getTime() < voucherStartTime.getTime())
                    return {
                        code: 404,
                        message: 'End time is not happen sooner than start time',
                    };
            }
            const result = await this.save({ ...voucher, ...updateVoucherDto });
            if (result)
                return {
                    code: 200,
                    message: 'Update voucher successful'
                };
        } catch (error) {
            throw new BadRequestException('Server error');
        }
    }

    async destroyVoucher(id: string) {
        try {
            const voucher = await this.findOne(id);
            if (!voucher)
                return {
                    code: 404,
                    message: 'Voucher is not found'
                };

            const result = await this.softRemove(voucher);
            if (result)
                return {
                    code: 200,
                    message: 'Delete voucher successful'
                };
        } catch (error) {
            throw new BadRequestException('Server error');
        }
    }
}