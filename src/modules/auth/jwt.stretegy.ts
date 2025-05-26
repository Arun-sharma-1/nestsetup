import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private readonly authService: AuthService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: JwtStrategy.extractTokenFromCookies,
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
      passReqToCallback: false,
    });
  }

  private static extractTokenFromCookies(req: Request): string | null {
    return req?.cookies?.token ?? null;
  }

  async validate(payload: any): Promise<any> {
    const user = await this.authService.findUserById(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
