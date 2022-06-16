import { EntityRepository, Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./entity/user.entity";
import * as moment from 'moment' //Use for format Dates
import * as bcrypt from 'bcrypt'
import { BadRequestException, ConflictException, forwardRef, Inject, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { SendmailService } from "src/common/sendmail/sendmail.service"
import { v4 as uuid } from "uuid";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
}