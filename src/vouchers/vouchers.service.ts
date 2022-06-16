import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { VoucherRepository } from './vouchers.repository';

@Injectable()
export class VouchersService {
    constructor(
        @InjectRepository(VoucherRepository)
        private readonly voucherRepository: VoucherRepository,
    ) { }

    create(createVoucherDtto: CreateVoucherDto) {
        return this.voucherRepository.createVoucher(createVoucherDtto);
    }

    findAll() {
        return this.voucherRepository.find();
    }

    findOne(id: string) {
        return this.voucherRepository.findOne(id);
    }

    update(id: string, updateVoucherDto: UpdateVoucherDto) {
        return this.voucherRepository.updateVoucher(id, updateVoucherDto);
    }

    remove(id: string) {
        return this.voucherRepository.destroyVoucher(id);
    }
}
