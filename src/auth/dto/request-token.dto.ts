import { IsNotEmpty } from "class-validator";

export class RequestTokenDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;
}