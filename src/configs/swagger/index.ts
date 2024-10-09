import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

async function bootstrap(): Promise<string> {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('OpenAPI Documentation')
    .setDescription('Chrome Extensions API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1/api', app, document);

  app.enableCors();
  await app.listen(process.env.PORT || 8080);

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
