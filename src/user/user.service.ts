import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as BcryptHashSync } from 'bcrypt';

@Injectable()
export class UserService {

    constructor( @InjectRepository(User) private userRepository: Repository<User>){}

    async create(createUserRequest: UserDto): Promise<UserDto>{

        const existingUser = await this.userRepository.findOne({ where: { username: createUserRequest.username } });
        if (existingUser) {
            throw new ConflictException(`Username '${createUserRequest.username}' already exists`);
        }

        createUserRequest.password = BcryptHashSync(createUserRequest.password, 10); 
        const userCreated = await this.userRepository.save(createUserRequest);
        const userCreatedDto: UserDto = {
            fullName: userCreated.fullName,
            username: userCreated.username
        }
        return userCreatedDto
    }

    async findByUserName(username: string){
        const userFound = await this.userRepository.findOne({where: { username: username}});
        if (!userFound) {
            return null;
        }

        return {
            id: userFound.id,
            username: userFound.username,
            password: userFound.password,
        };
    }


}
