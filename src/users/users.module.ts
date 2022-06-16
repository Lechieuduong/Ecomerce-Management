import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CommonModule } from 'src/common/common.module';
import { SendmailService } from 'src/common/sendmail/sendmail.service';
import { UserAddress } from './entity/user-address.entity';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAddress, UsersRepository]),
    NestjsFormDataModule,
    CommonModule
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService]
})
export class UsersModule { }
