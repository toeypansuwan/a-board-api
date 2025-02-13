import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService, PrismaService, JwtService],
})
export class CommentModule {}
