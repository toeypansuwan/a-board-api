/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Param, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}
    
    @Post(':postId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({ operationId: 'createComment' })
    createComment(@Body() body: CreateCommentDto, @Param('postId') postId: string, @Request() req: any) {
        return this.commentService.createComment(body, postId, req.user.id);
    }
}
