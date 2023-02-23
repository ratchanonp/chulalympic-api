import { Role } from '@prisma/client';
import { Request } from 'express';

export interface jwtPayload {
  sub: number;
  username: string;
  role: Role;
}

export interface ReqUser {
  userId: number;
  username: string;
  role: Role;
}

export interface AuthResponse {
  access_token: string;
}

export interface UserRequest extends Request {
  user: ReqUser;
}
