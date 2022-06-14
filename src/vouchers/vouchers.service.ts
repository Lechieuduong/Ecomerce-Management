import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVoucherDto } from './dto/create-voucher.dto';
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
}
