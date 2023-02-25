import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserWOCredential } from '../users/interface/users.interface';
import { UsersService } from '../users/users.service';
import { AuthResponse, jwtPayload } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserWOCredential> {
    const user = await this.usersService.findOne(username);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return null;

    const { password: _, ...result } = user;
    return result;

    return null;
  }

  async signin(user: UserWOCredential): Promise<AuthResponse> {
    const { username, id, role } = user;
    const payload: jwtPayload = { username, sub: id, role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
