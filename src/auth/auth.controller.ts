import { Body, Controller, Post } from '@nestjs/common';
import { AuthRequestDto, AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post("")
    async signUp(){

    }

    @Post("login")
    async signIn(@Body() authLoginRequest: AuthRequestDto): Promise<AuthResponseDto>{
        return await this.authService.signIn(authLoginRequest);
    }



}
