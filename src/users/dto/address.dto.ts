import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class AddressUserDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @ApiProperty()
    address: string;
}