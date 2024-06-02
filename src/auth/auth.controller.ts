import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRequestDto, AuthResponseDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @Post("login")
    async signIn(@Body() authLoginRequest: AuthRequestDto): Promise<AuthResponseDto>{
        try {
            return await this.authService.signIn(authLoginRequest);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: error.message
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

}
