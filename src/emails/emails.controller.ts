import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('emails')
export class EmailsController {
  constructor(private mailerService: MailerService) {}
}
