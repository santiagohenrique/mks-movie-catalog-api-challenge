import { ApiProperty } from "@nestjs/swagger";

export class AuthRequestDto{
    @ApiProperty({
        description: 'O nome de identificação do usuário que foi inserido na criação do perfil.',
        example: 'hikolas3390'
    })
    username: string;
    @ApiProperty({
        description: 'A senha de identificação do usuário que foi inserida na criação do perfil.',
        example: 'mks123456'
    })
    password: string;
}


export class AuthResponseDto{

    token: string;
    expiresIn: number;

}