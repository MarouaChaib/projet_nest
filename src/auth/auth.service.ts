import { Injectable } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth-request.dto';

@Injectable()
export class AuthService {
    async handleAuthRequest(authRequest: AuthRequestDto) {
      console.log("test");
    }
}
