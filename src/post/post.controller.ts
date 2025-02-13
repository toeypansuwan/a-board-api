/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { GetPostsQuery } from './dto/get-posts.query';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}


    @Get()
    @ApiResponse({
        type: [PostEntity],
        status: 200,
        description: 'Get all posts',
    })
    @ApiOperation({ operationId: 'getPosts' })
    async getPosts(@Query() query: GetPostsQuery) {
        return await this.postService.getPosts(query);
    }

    //get post create by me
    @Get('me')
    @UseGuards(AuthGuard)
    @ApiOperation({ operationId: 'getPostsByMe' })
    @ApiResponse({
        type: [PostEntity],
        status: 200,
        description: 'Get posts created by me',
    })
    @ApiBearerAuth()
    async getPostsByMe(@Query() query: GetPostsQuery, @Request() req: any) {
        return await this.postService.getPostsByMe(req.user.id, query);
    }

    @Get(':id')
    @ApiOperation({ operationId: 'getPostById' })
    @ApiResponse({
        type: PostEntity,
        status: 200,
        description: 'Get post by id',
    })
    async getPostById(@Param('id') id: string) {
        return await this.postService.getPostById(id);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiOperation({ operationId: 'createPost' })
    async createPost(@Body() body: CreatePostDto, @Request() req: any) {
        return await this.postService.createPost(body, req.user.id);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ operationId: 'updatePost' })
    async updatePost(@Param('id') id: string, @Body() body: CreatePostDto) {
        return await this.postService.updatePost(id, body);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ operationId: 'deletePost' })
    async deletePost(@Param('id') id: string) {
        return await this.postService.deletePost(id);
    }
}
