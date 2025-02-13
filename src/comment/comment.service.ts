/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    async createComment(data: CreateCommentDto, postId: string, userId: string) {
        return await this.prisma.comment.create({
            data: {
                content: data.content,
                postId: postId,
                userId: userId,
            },
        });
    }
}
