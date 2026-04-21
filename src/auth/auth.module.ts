import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { AuthUserMiddleware } from './auth-user.middlware';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forFeature([Token])
  ],
  controllers: [AuthController],
  providers: [AuthService , AuthUserMiddleware],
})
export class AuthModule {}
