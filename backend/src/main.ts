import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
process.env['NODE_CONFIG_DIR'] = __dirname + '/../config/';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: process.env.ORIGIN || serverConfig.origin });
    logger.log(`Accepting request only from: ${process.env.ORIGIN || serverConfig.origin}`);
  }
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errorMessages = { error: {} };
        errors.forEach(
          (error) =>
            (errorMessages.error[error.property] = Object.values(
              error.constraints,
            )
              .join('. ')
              .trim()),
        );
        return new UnprocessableEntityException(errorMessages);
      },
    }),
  );
  const apiConfig = config.get('app');
  const swaggerConfig = new DocumentBuilder()
    .setTitle(apiConfig.name)
    .setDescription(apiConfig.description)
    .setVersion(apiConfig.version)
    .build();
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: apiConfig.description,
  };
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(port);
  logger.log(`Application listening in port: ${port}`);
}

bootstrap();
