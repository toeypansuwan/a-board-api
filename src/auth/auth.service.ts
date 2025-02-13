/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signin(username: string) {
    //check if username is exist
    let user = await this.prisma.user.findUnique({
      where: {
        name: username,
      },
    });
    //if user not found, create new user
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          name: username,
          image: `https://robohash.org/${username}`,
        },
      });
    }
    return {
      access_token: this.jwtService.sign({ id: user.id, name: user.name }),
    };
  }

  //get me
  async getMe(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}
