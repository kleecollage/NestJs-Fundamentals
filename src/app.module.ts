import { Module } from '@nestjs/common';
import { EmailModule } from 'src/modules/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
