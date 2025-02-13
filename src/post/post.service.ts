/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetPostsQuery } from './dto/get-posts.query';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPosts(query: GetPostsQuery) {
    return await this.prisma.post.findMany({
      where: {
        ...(query.categoryId && { categoryId: query.categoryId }),
        ...(query.search && {
          title: { contains: query.search },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        category: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async createPost(data: CreatePostDto, userId: string) {
    return await this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
        userId: userId,
      },
    });
  }

  async deletePost(id: string) {
    return await this.prisma.post.delete({
      where: { id },
    });
  }

  async updatePost(id: string, data: CreatePostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
      },
    });
  }

  async getPostsByMe(userId: string, query: GetPostsQuery) {
    return await this.prisma.post.findMany({
      where: {
        userId,
        ...(query.categoryId && { categoryId: query.categoryId }),
        ...(query.search && {
          title: { contains: query.search }
        })
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        category: true,
        comments: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            user: true
          }
        }
      }
    });
  }

  async getPostById(id: string) {
    return await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        category: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
          },
        },
      },
    });
  }
}
