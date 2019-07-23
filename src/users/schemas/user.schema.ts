import { Schema } from 'mongoose';
import * as crypto from 'crypto'
import { User } from '../interfaces/user.interface';

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre<User>('save', function (next) {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
    next();
})