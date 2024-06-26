import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');


async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      noAck: false,
      queue: 'admin-backend'
    },
  });
  logger.log('Microservice is listening test')

  await app.listen();
}
bootstrap();
