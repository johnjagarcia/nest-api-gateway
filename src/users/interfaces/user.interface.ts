import { Document } from 'mongoose';

export interface User extends Document {
    readonly name: string;
    readonly username: string;
    readonly email: string;
    password: string;
    readonly createdAt: Date;
}