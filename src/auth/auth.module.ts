import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';

@Module({
  imports : [
    UsersModule,
    TypeOrmModule.forFeature([Token])

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
