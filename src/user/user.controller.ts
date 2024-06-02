import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {


    constructor(private userService: UserService){}

    @Get()
    async findAll(): Promise<UserDto[]>{
        return await this.userService.findAll();
    }

    @Get("/:id")
    async findById(@Param('id') id: string): Promise<UserDto>{
        return await this.userService.findById(id);
    }


    @Post()
    async create(@Body() createUserRequest: UserDto): Promise<UserDto>{
        return await this.userService.create(createUserRequest);
    }

    @Put("/:id")
    async update(@Param('id') id: string, @Body() updateUserRequest: UserDto){
        return await this.userService.update(id, updateUserRequest);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete("/:id")
    async delete(@Param('id') id: string){
        try{
            await this.userService.delete(id);
        } catch (error){
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }


}
