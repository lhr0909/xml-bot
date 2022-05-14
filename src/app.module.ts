import { Module } from '@nestjs/common';

import { BotModule } from './bot';
import { AppController } from './app.controller';

@Module({
  imports: [BotModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
