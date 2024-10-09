import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import * as controllers from './controllers';

@Module({
  imports: [TerminusModule, HttpModule], //TODO: Authentication should be added here
  controllers: Object.values(controllers),
})
export class BaseModule {}
