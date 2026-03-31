import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';

@Module({
  imports:
  
  [TypeOrmModule.forRoot({
    type : 'sqlite',
    database : './app-db.sqlite',
    synchronize : false, 
    entities  : [User]
  }),
  
 // TypeOrmModule.forFeature([User]),
 
  UsersModule,
  
 EmailModule,// access aux reposetory d'une entity par module
],
 
})
export class AppModule {}
