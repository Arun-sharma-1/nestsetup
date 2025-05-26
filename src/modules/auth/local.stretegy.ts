import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Observable } from "rxjs";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStretegy extends PassportStrategy(Strategy, 'local') {

    constructor(private authService: AuthService) {
        super()
    }

    async validate(username: string, password: string): Promise<any> {
        if (!username || !password) {
            throw new BadRequestException('Username and Password are Requrired..')
        }
        console.log('username', username)
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        console.log('coming here..')
        return user;
    }
}