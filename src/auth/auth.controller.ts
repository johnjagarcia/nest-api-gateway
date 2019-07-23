import { Controller, Post, Body, NotFoundException, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RequestTokenDto } from './dto/request-token.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    @Post('request-token')
    async requestToken(@Body() requestTokenDto: RequestTokenDto) {
        const user = await this.usersService.findByCredentials(
            requestTokenDto.username,
            requestTokenDto.password
        );

        if (!user)
            throw new NotFoundException('No user found with the username or password provided');

        return await this.authService.createToken(user.username)
    }

    @Get('data')
    @UseGuards(AuthGuard())
    findAll() {
        return 'You are authenticated.'
    }
}
