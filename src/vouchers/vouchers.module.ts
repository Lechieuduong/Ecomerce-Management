import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { VouchersController } from './vouchers.controller';
import { VoucherRepository } from './vouchers.repository';
import { VouchersService } from './vouchers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoucherRepository]),
    NestjsFormDataModule,
  ],
  controllers: [VouchersController],
  providers: [VouchersService],
  exports: [VouchersService]
})
export class VouchersModule { }
