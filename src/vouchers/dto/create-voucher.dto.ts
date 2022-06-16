import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { DiscountUnit } from "../enum/discount-unit.enum";

export class CreateVoucherDto {
    @IsString()
    @ApiProperty({ type: 'string' })
    voucher_code: string;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty({ type: 'number' })
    discount_value: number;

    @IsEnum(DiscountUnit)
    @IsString()
    @ApiProperty({ enum: DiscountUnit })
    discount_unit: DiscountUnit;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({ type: 'string' })
    created_date: Date;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({ type: 'string' })
    valid_until: Date;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    mininum_order_value: number;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    maximum_discount_amount: number;

    @IsNumber()
    @IsOptional()
    @IsOptional()
    @ApiProperty()
    quantity: number

    @ApiProperty({ type: 'boolean' })
    is_redeem_allowed: boolean;
}