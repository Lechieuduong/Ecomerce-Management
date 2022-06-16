import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt'
import * as moment from 'moment' //Use for format Dates
import * as bcrypt from 'bcrypt'
import { BadRequestException, ConflictException, ForbiddenException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { SendmailService } from "src/common/sendmail/sendmail.service"
import { v4 as uuid } from "uuid";
import { LoginDto } from './dto/login.dto';
import { UserPayload } from 'src/common/auth/user.payload';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,

        @Inject(forwardRef(() => SendmailService))
        private sendMailService: SendmailService,

        private jwtService: JwtService,
    ) { }


    // Register and verify email
    async register(registerDto: RegisterDto) {
        const { name, username, email, phone, password } = registerDto;
        const currentDate = moment().format();
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            const user = this.usersRepository.create({
                name,
                username,
                email,
                phone,
                password: hashedPassword,
                verifyCode: uuid(),
                created_at: currentDate,
                updated_at: currentDate,
            });

            await this.usersRepository.save(user);

            this.sendMailVerifyUser(email);

            return {
                statusCode: 200,
                message: 'Create user successfully. Please check your email to verify user.',
                data: user,
            };
        } catch (error) {
            console.log(error);

            throw new InternalServerErrorException();
        }
    }

    async sendMailVerifyUser(email: string) {
        const user = await this.usersRepository.findOne({ email });
        const currentDate = moment().format();

        if (!user)
            throw new NotFoundException(`Usser have email: ${email} is not found.`);

        if (user.verify)
            throw new BadRequestException('Verified account.');

        if (user.created_at.getTime() !== user.updated_at.getTime()) {
            const time = new Date(currentDate).getTime() - user.updated_at.getTime();
            const getTimeSendMail = time / (1000 * 60 * 5);

            if (getTimeSendMail < 1)
                throw new BadRequestException(
                    `Please wait about ${getTimeSendMail} minute.`,
                );
        }

        let url = process.env.DOMAIN + '/user/verify?email=' + email + '&verifyCode=' + user.verifyCode;

        //const res = await 
        const res = await this.sendMailService.sendMailVerify(url, email);
        console.log(res);



        user.updated_at = new Date(currentDate);
        await user.save();

        return {
            statusCode: 200,
            message: res.response,
            data: {},
        };
    }

    //Login and Verify user
    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;

        const user = await this.usersRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            if (!user.verify) {
                throw new ForbiddenException('Please check your email to verify user.');
            }

            const userPayLoad: UserPayload = {
                username: user.username,
                role: user.role,
            };

            const accesToken = this.jwtService.sign(userPayLoad);

            return {
                statusCode: 201,
                message: 'Login successfully.',
                data: { accesToken },
            };
        }

        throw new BadRequestException('Wrong username or password.');
    }


}
