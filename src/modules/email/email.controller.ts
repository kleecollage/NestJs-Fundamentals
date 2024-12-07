import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageDto } from 'src/modules/email/dto/message-dto';
import { EmailService } from 'src/modules/email/email.service';

@Controller('api/v1/email')
@ApiTags('Email')
export class EmailController {
  constructor(private emailService: EmailService) {}
  //** ---------------------------------------- SEND EMAIL  ---------------------------------------- **//
  @Post('send-email')
  @ApiOperation({
    description: 'Send one email',
  })
  @ApiBody({
    description: 'Send one email using MessageDto',
    type: MessageDto,
    examples: {
      example1: {
        value: {
          subject: 'Mail sended from POSTMAN with NestJS',
          body: /*html*/ ' <b> Hello </b> to everyone ',
          receivers: [
            {
              email: 'testing_mail@gmail.com',
            },
            {
              email: 'pogem77488@bawsny.com',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Email sended successfully',
  })
  sendEmail(@Body() message: MessageDto) {
    return this.emailService.sendEmail(message);
  }
}
