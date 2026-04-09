import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';
import { UniqueEmailValidator } from './validater/uniqueEmailValidater';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), //  injection du repository
    EmailModule
  ],
  controllers: [UsersController],
  providers: [UsersService , UniqueEmailValidator], // injection du service et du validateur
  exports: [UsersService] 
})
export class UsersModule {}
