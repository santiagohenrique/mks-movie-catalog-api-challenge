import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {


    constructor(private userService: UserService){}


    @Post()
    async create(@Body() createUserRequest: UserDto): Promise<UserDto>{
        
        return await this.userService.create(createUserRequest);
        
    }




}
