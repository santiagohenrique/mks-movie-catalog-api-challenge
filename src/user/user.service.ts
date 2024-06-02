import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as BcryptHashSync } from 'bcrypt';

@Injectable()
export class UserService {

    constructor( @InjectRepository(User) private userRepository: Repository<User>){}

    async findAll(): Promise<UserDto[]>{
        const usersList = await this.userRepository.find();
        return usersList.map(user => {
            const userDto: UserDto = {
                id: user.id,
                fullName: user.fullName,
                username: user.username,
            };
            return userDto;
        });
    }

    async findById(id: string): Promise<UserDto>{
        const user = await this.userRepository.findOne({ where: {id: id}});
        if (!user) {
            throw new NotFoundException(`User with id '${id}' not found`);
        }

        const userDto: UserDto = {
            id: user.id,
            fullName: user.fullName,
            username: user.username,
        };

        return userDto;
    }

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

    async update(id: string, updateUserRequest: UserDto): Promise<UserDto>{
        const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
        throw new NotFoundException(`User with id '${id}' not found`);
    }

    // Atualiza os campos necessários
    if (updateUserRequest.fullName) {
        user.fullName = updateUserRequest.fullName;
    }

    if (updateUserRequest.username) {

        const existingUser = await this.userRepository.findOne({ where: { username: updateUserRequest.username } });
        if (existingUser && existingUser.id !== user.id) {
            throw new ConflictException(`Username '${updateUserRequest.username}' already exists`);
        }
        user.username = updateUserRequest.username;
    }


        if (updateUserRequest.password) {
            user.password = BcryptHashSync(updateUserRequest.password, 10);
        }

        await this.userRepository.save(user);

        const updatedUserDto: UserDto = {
            id: user.id,
            fullName: user.fullName,
            username: user.username,
        };

        return updatedUserDto;
    }

    async delete(id: string): Promise<void>{
        const user = await this.userRepository.findOne({ where: {id: id}});
        if (!user) {
            throw new NotFoundException(`User with id '${id}' not found`);
        }
        await this.userRepository.delete(id)
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
