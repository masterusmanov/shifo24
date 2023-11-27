import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/exception-handler';
// import { AppClusterService } from './shared/app-clustering';
import { createDocument } from './swagger/swagger';
// import { RedisIoAdapter } from './chat/adapters/redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  // app.useWebSocketAdapter(new RedisIoAdapter(app));

  SwaggerModule.setup('/api-docs', app, createDocument(app));

  await app.listen(3000);
}
bootstrap()
// AppClusterService.clusterize(bootstrap);
