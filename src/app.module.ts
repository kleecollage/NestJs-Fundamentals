import { Module } from '@nestjs/common';
import { SERVICES } from 'src/modules/email/config/email-config';
import { EmailModule } from 'src/modules/email/email.module';

@Module({
  imports: [
    EmailModule.register({
      from: 'antonio.hs6991@gmail.com',
      password: 'ofuw sjiv ebsu pcqe',
      service: SERVICES.GMAIL,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
