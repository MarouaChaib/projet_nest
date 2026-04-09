import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); // Permet à class-validator d'utiliser le conteneur d'injection de dépendances de NestJS pour résoudre les dépendances des validateurs personnalisés, comme UniqueEmailValidator.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

