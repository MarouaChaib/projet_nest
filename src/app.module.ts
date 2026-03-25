import { Module } from '@nestjs/common';

import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

import { UsersService } from './users/users.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type : 'sqlite',
    database : 'db.sqlite',
    synchronize : true, 
    entities  : [User]
  }),
  TypeOrmModule.forFeature([User])// access aux reposetory d'une entity par module
],
  controllers: [ UsersController],
  providers: [UsersService],
})
export class AppModule {}
