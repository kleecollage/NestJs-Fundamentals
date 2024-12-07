import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from 'src/modules/email/email.service';

@Controller('api/v1/email')
@ApiTags('Email')
export class EmailController {
  constructor(private emailService: EmailService) {}
}
