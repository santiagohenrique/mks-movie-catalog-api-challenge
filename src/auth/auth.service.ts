import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRequestDto, AuthResponseDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    private jwtExpirationTimeInSeconds: number;

    constructor(
        private userService: UserService, 
        private jwtService: JwtService,
        private configService: ConfigService
    ){
        this.jwtExpirationTimeInSeconds = +configService.get<number>('JWT_EXPIRATION_TIME');
    }

    async signIn(authLoginRequest: AuthRequestDto): Promise<AuthResponseDto>{
        const foundUser = await this.userService.findByUserName(authLoginRequest.username);
        if(!foundUser || !bcryptCompareSync(authLoginRequest.password, foundUser.password) ){
            throw new UnauthorizedException('Credenciais inválidas. Verifique seu nome de usuário e senha.');
        }

        const payload = {
            sub: foundUser.id,
            username: foundUser.username
        }

        const token = this.jwtService.sign(payload, { expiresIn: `${this.jwtExpirationTimeInSeconds}s` });


        return {
            token,
            expiresIn: this.jwtExpirationTimeInSeconds
        }
    }






}
