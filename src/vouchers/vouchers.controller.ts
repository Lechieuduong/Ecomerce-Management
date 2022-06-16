import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { VouchersService } from './vouchers.service';


@Controller('voucher')
@UseFilters(HttpExceptionFilter)
@ApiTags('Voucher')
export class VouchersController {
    constructor(private readonly vouchersService: VouchersService) { }

    @Post()
    @FormDataRequest()
    create(@Body() createVoucherDto: CreateVoucherDto) {
        return this.vouchersService.create(createVoucherDto);
    }

    @Get()
    findAll() {
        return this.vouchersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vouchersService.findOne(id);
    }

    @Patch(':id')
    @FormDataRequest()
    update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
        return this.vouchersService.update(id, updateVoucherDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vouchersService.remove(id);
    }
}


