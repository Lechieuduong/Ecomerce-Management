import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendmailService {
    constructor(private mailerService: MailerService) { }

    async sendMailVerify(url: string, email: string) {
        try {
            const result = await this.mailerService.sendMail({
                to: email,
                from: 'lechieuduong0203@gmail.com',
                subject: 'Thanks for register!',
                html: `
                <p style="margin-top: 50px; font-size: 18px">
                This is the link to verify your account :
                <a style="text-decoration: none" href="${url}">! Click here !</a>
                </p>`
            });
            return result;
        } catch (error) {
            console.log(error);

        }
    }
}
