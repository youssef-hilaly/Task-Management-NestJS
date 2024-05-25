// https:www.youtube.com/watch?v=NBgjYXcBtMI Next
// https://github.com/kentloog/nestjs-sequelize-typescript/tree/master/src/users
// https://medium.com/@mikess_dev/creating-a-nest-js-project-with-sequelize-and-sqlite-870d29908a8c
// https://www.freecodecamp.org/news/build-web-apis-with-nestjs-beginners-guide/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use validation pipes whenever you faced validation decorator
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
