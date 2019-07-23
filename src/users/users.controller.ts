import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto): Promise<any> {
        return await this.userService.createUser(createUserDto);
    }
}