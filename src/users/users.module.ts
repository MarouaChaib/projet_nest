import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), //  injection du repository
    EmailService 
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] 
})
export class UsersModule {}
