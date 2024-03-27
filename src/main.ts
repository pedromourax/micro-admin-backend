import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');


async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:gVndBrn6v6B+@54.160.160.41:5672/smartranking'],
      queue: 'admin-backend'
    },
  });
  logger.log('Microservice is listening')

  await app.listen();
}
bootstrap();
