import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  selectWithOutCredential,
  UserWOCredential,
} from './interface/users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserWOCredential> {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    createUserDto.password = hashedPassword;

    return this.prisma.user.create({
      data: createUserDto,
      select: selectWithOutCredential,
    });
  }

  async findAll(): Promise<UserWOCredential[]> {
    return await this.prisma.user.findMany({ select: selectWithOutCredential });
  }

  async findOne(username: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserWOCredential> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
      select: selectWithOutCredential,
    });
  }

  async remove(id: number): Promise<UserWOCredential> {
    return this.prisma.user.delete({
      where: {
        id,
      },
      select: selectWithOutCredential,
    });
  }
}
