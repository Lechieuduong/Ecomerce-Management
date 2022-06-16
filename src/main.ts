import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CategoriesModule } from './categories/categories.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ecomerce Management')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/ecomerce', app, document);

  const port = 5000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
