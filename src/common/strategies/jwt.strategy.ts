import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Decription } from '../encription/decription';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: `${process.env.IGNORE_JWT_EXPIRE}`,
      secretOrKey: `Gebhaly`,
    });
  }

  async validate(payload: any) {
    try {      
      //#decrept
      const iv = process.env.ENCRIPT_IV;
      const password = process.env.ENCRIPT_KEY;
      return {
        userId: Decription(payload.userId, password, iv),
        userName: Decription(payload.userName, password, iv),
        userPhone: Decription(payload.userPhone, password, iv),
      };
    } catch (e) {
      console.log(e);
      
      throw new UnauthorizedException(e);
    }
  }
}
