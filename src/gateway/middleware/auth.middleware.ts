import { NestMiddleware, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { JwtService } from '@nestjs/jwt'

export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) { }

    async use(req: any, res: any, next: () => void) {
        const authHeaders = req.headers.authorization;

        if (authHeaders && (authHeaders as string).split(' ')[1]) {
            const token = (authHeaders as string).split(' ')[1];
            const decoded: any = this.jwtService.verify(token);
            const user = await this.usersService.findByUsername(decoded.username);

            if (!user) {
                throw new NotFoundException('User Not Found!')
            }

            req.user = user;
            next();
        } else {
            throw new UnauthorizedException();
        }
    }
}