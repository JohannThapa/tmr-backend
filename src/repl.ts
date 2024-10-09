import { Logger as NestLogger } from '@nestjs/common';
import { repl } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  await repl(AppModule);
}

void (async (): Promise<void> => {
  try {
    await bootstrap();
    NestLogger.log('REPLServer', 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
