import { Body, Controller, Post } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
    constructor(private readonly vouchersService: VouchersService) { }

    @Post()
    @FormDataRequest()
    create(@Body() createVoucherDto: CreateVoucherDto) {
        return this.vouchersService.create(createVoucherDto);
    }
}
