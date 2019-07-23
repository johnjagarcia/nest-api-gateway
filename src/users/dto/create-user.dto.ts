import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @Length(8, 100)
    readonly password: string;

    readonly createdAt: Date;
}