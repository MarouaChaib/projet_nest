import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { dataBaseModuleOptions } from './config/configuration-database';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.dev.env' : '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(dataBaseModuleOptions),
    UsersModule,
    EmailModule,
  ],
})
export class AppModule {}