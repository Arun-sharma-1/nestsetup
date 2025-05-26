import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/core/decorator/public.decorator";
import { LocalAuthGuard } from "src/core/guards/local.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req: any, @Res({ passthrough: true }) res: any) {
        //reached --> already validated
        const user = req.user;
        console.log('user data', user)
        const { access_token } = await this.authService.login(user);
        console.log('access_token', access_token)
        res.cookie('token', access_token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 1,
            sameSite: 'lax',
        })

        return "Login Successful"
    }
}
