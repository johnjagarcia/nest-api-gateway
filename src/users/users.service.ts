import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as crypto from 'crypto'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private readonly userModel: Model<User>) { }

    async findByCredentials(username: string, password: string): Promise<User> {
        const conditions = {
            username,
            password: crypto.createHmac('sha256', password).digest('hex'),
        };
        return await this.userModel.findOne(conditions);
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userModel.findOne({ username });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new this.userModel(createUserDto);
        return await user.save();
    }
}
