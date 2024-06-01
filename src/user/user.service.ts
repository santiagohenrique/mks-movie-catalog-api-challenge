import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as BcryptHashSync } from 'bcrypt';

@Injectable()
export class UserService {

    constructor( @InjectRepository(User) private userRepository: Repository<User>){}

    async create(createUserRequest: UserDto): Promise<UserDto>{
        //Verify if username exists before creating
        createUserRequest.password = BcryptHashSync(createUserRequest.password, 10); 
        const userCreated = await this.userRepository.save(createUserRequest);

        const userCreatedDto: UserDto = {
            fullName: userCreated.fullName,
            username: userCreated.username,
        }
        
        return userCreatedDto;

    }


}
