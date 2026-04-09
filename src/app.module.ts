import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { dataBaseModuleOptions } from './config/configuration-database';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.dev.env' : '.env', // charge les variables d'environnement à partir du fichier .dev.env en mode développement et du fichier .env en production.
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync(dataBaseModuleOptions),
    UsersModule,
    EmailModule,
    AuthModule,
  ],
})
export class AppModule {}