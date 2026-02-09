import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findByName(username);

      if (!user) {
        throw new UnauthorizedException('اسم المستخدم أو كلمة المرور غير صحيحة');
      }

      const result = await bcrypt.compare(pass, user.password);

      if (!result) {
        throw new UnauthorizedException('اسم المستخدم أو كلمة المرور غير صحيحة');
      }

      const { password, ...res } = user;
      return res;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        // expiresIn: '1m',
        expiresIn: '1d',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        // expiresIn: '2m',
        expiresIn: '7d',
      }),
    };
  }

  async refresh(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        // expiresIn: '1m',
        expiresIn: '1d',
      }),
    };
  }
}
