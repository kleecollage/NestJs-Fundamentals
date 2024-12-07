import { Controller } from '@nestjs/common';
import { CronService } from 'src/modules/cron/cron.service';

@Controller('api/v1/cron')
export class CronController {
  constructor(private cronService: CronService) {}
}
