import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async handleAuthRequest(@Body() authRequest: AuthRequestDto) {
    await this.authService.handleAuthRequest(
      authRequest
    );
  }
}
