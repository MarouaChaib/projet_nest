import { Body, Controller, Post } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth.request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    @Post()
    async handleAuthRequest(@Body() authRequest : AuthRequestDto){
        await this.authService.handlAuthRequest(authRequest)
    }
}
