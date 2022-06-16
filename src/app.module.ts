import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { SendmailService } from './common/sendmail/sendmail.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '02032002',
      database: 'ecomerce-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({
      dest: './files',
    }),
    CategoriesModule,
    VouchersModule,
    UsersModule,
    CommonModule,
  ],
  providers: [SendmailService],
})
export class AppModule { }
