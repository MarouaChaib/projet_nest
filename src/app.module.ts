import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { dataBaseModuleOptions } from './config/configuration-database';


@Module({
  imports:
  
  [TypeOrmModule.forRoot(
     dataBaseModuleOptions
  ),
  
 // TypeOrmModule.forFeature([User]),
 
  UsersModule,
  
 EmailModule,
 // access aux reposetory d'une entity par module
  ConfigModule.forRoot({isGlobal : true}),
 

],
 
})
export class AppModule {}
