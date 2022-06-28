import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailsService {
  constructor(private mailerService: MailerService) {}

  async sendMessage(toEmail: string, text) {
    try {
      await this.mailerService.sendMail({
        to: toEmail,
        from: 'Phamphuw01@gmail.com',
        subject: 'Simple plant text',
        text: text,
      });
    } catch (error) {
      console.log(error);
      return 'false';
    }
    return 'true';
  }
}
