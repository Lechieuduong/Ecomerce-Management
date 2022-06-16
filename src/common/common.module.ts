import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SendmailService } from './sendmail/sendmail.service';
;

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async () => ({
                transport: {
                    host: 'smtp.gmail.com',
                    secure: false,
                    auth: {
                        user: 'lechieuduong0203@gmail.com',
                        pass: 'ihxnwfptadldzjta',
                    },
                },
                defaults: {
                    from: '"No reply" <noreply.lechieuduong0203@gmail.com>',
                },
                template: {
                    options: {
                        strict: true,
                    }
                }
            })
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [SendmailService],
    exports: [SendmailService]
})
export class CommonModule { }
