import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.registerAsync({
    global: true,
    imports: [],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: +configService.get<number>('JWT_JWT_EXPIRATION_TIME')}
    }),
    inject: [ConfigService],
  }), 
    UserModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
