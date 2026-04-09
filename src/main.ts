import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); // Permet à class-validator d'utiliser le conteneur d'injection de dépendances de NestJS pour résoudre les dépendances dans les validateurs personnalisés. Cela est nécessaire pour que le validateur UniqueEmailValidator puisse injecter le repository User et vérifier l'unicité de l'email.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

