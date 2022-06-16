import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(35)
    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(35)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @MinLength(8)
    @MaxLength(50)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(35)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Your password so weak !!!',
    })
    password: string;
}