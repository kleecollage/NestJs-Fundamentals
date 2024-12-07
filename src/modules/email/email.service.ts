import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailConfig } from 'src/modules/email/config/email-config';
import { MessageDto } from 'src/modules/email/dto/message-dto';

@Injectable()
export class EmailService {
  constructor(
    @Inject('CONFIG_OPTIONS')
    private options: EmailConfig,
  ) {
    console.log(this.options);
  }
  //** ---------------------------------------- SEND EMAIL  ---------------------------------------- **//
  sendEmail(message: MessageDto) {
    const transporter = nodemailer.createTransport({
      service: this.options.service,
      auth: {
        user: this.options.from,
        pass: this.options.password,
      },
    });

    try {
      const to = message.receivers.map((e) => e.email);
      const mailOptions = {
        from: this.options.from,
        to,
        subject: message.subject,
        html: message.body,
      };

      return transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
