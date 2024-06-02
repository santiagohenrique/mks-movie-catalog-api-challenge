import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UserDto{

    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'O nome completo do usuário.',
        example: 'Henrique Santiago'
    })
    fullName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({
        description: 'O nome de identificação do usuário que vai ser usado para autenticação (mínimo de 5 caracteres).',
        example: 'hikolas3390'
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({
        description: 'A senha de cadastro do usuário (mínimo de 8 caracteres).',
        example: 'mks123456'
    })
    password?: string;

}