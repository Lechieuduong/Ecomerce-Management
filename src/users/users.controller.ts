import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseFilters(HttpExceptionFilter)
@ApiTags('User')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/register')
    @FormDataRequest()
    register(@Body() registerDto: RegisterDto) {
        return this.usersService.register(registerDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.usersService.login(loginDto);
    }
}
