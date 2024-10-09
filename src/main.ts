import { NestFactory } from '@nestjs/core';
import { Logger as NestLogger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SupabaseConfig } from './configs/services';
import { middleware } from './app.middleware';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap(): Promise<string> {
  const isProduction = process.env['NODE_ENV'] === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  const supabaseConfig = app.get(SupabaseConfig);

  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  if (isProduction) {
    app.enable('trust proxy');
  }

  // Express Middleware
  middleware(app, supabaseConfig);

  app.enableShutdownHooks();
  await app.listen(process.env.PORT || 3000);

  return app.getUrl();
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
