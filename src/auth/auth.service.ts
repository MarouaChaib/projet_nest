import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthuserDto } from './dto/auth-user.dto';
import { UsersService } from 'src/users/users.service';
import { Token } from './token.entity';
import { generateUnitValues } from 'src/shared';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/loggin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async handleAuthRequest(
    authRequest: AuthRequestDto,
  ): Promise<{ user: AuthuserDto; token: string }> {

    // 🔥 1. vérifier token envoyé (register ou login)
    const user = await this.usersService.validateToken(
      authRequest.token,
      authRequest.operation,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = new Token();
    token.user = user;
    token.token = generateUnitValues();

    await this.tokenRepository.save(token);

    // 🔥 3. retourner user + token
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        handle: user.handle,
        image: user.image,
      },
      token: token.token,
    };
  }
  async logout(token: string) {
    await this.tokenRepository.delete({ token });
  }
  async login(email: LoginDto) {
    await this.usersService.generateLoginToken(email.email);
  }
  async validateUser(token: string): Promise<AuthuserDto | null> {
    const tokenEntity = await this.tokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });
    if (!tokenEntity) {
      return null;
    }
    return tokenEntity.user;
  }
  }