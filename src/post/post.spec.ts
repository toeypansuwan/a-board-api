import { PrismaService } from '../prisma/prisma.service';
import { PostService } from './post.service';
import { Test, TestingModule } from '@nestjs/testing';
import { GetPostsQuery } from './dto/get-posts.query';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

describe('PostService', () => {
    let postService: PostService;
    let prismaService: PrismaService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          PostService,
          {
            provide: PrismaService,
            useValue: {
              post: {
                findMany: jest.fn(),
                create: jest.fn(),
                delete: jest.fn(),
                update: jest.fn(),
                findUnique: jest.fn(),
              },
            },
          },
        ],
      }).compile();
  
      postService = module.get<PostService>(PostService);
      prismaService = module.get<PrismaService>(PrismaService);
    });
  
    it('should be defined', () => {
      expect(postService).toBeDefined();
    });
  
    describe('getPosts', () => {
      it('should return filtered posts', async () => {
        const query: GetPostsQuery = { categoryId: '1', search: 'NestJS' };
        const mockPosts:Post[] = [
          { id: '1', title: 'Learning NestJS',content: 'Content', categoryId: '1', userId: '1',createdAt: new Date(),updatedAt: new Date() },
          { id: '2', title: 'Advanced NestJS',content: 'Content', categoryId: '1', userId: '1',createdAt: new Date(),updatedAt: new Date() },
          { id: '3', title: 'NestJS Testing',content: 'Content', categoryId: '1', userId: '1',createdAt: new Date(),updatedAt: new Date() }
        ];
        jest.spyOn(prismaService.post, 'findMany').mockResolvedValue(mockPosts);
  
        const result = await postService.getPosts(query);
        expect(result).toEqual(mockPosts);
      });
  
      it('should return an empty array if no posts match the filter', async () => {
        const query: GetPostsQuery = { categoryId: '99', search: 'Unknown' };
        jest.spyOn(prismaService.post, 'findMany').mockResolvedValue([]);
  
        const result = await postService.getPosts(query);
        expect(result).toEqual([]);
      });
  
      it('should return all posts if no filters are applied', async () => {
        const query: GetPostsQuery = {};
        const mockPosts:Post[] = [
          { id: '1', title: 'Post 1',content: 'Content', categoryId: '1', userId: '1',createdAt: new Date(),updatedAt: new Date() },
          { id: '2', title: 'Post 2',content: 'Content', categoryId: '2', userId: '1',createdAt: new Date(),updatedAt: new Date() },
          { id: '3', title: 'Post 3',content: 'Content', categoryId: '3', userId: '1',createdAt: new Date(),updatedAt: new Date() }
        ];
        jest.spyOn(prismaService.post, 'findMany').mockResolvedValue(mockPosts);
  
        const result = await postService.getPosts(query);
        expect(result).toEqual(mockPosts);
      });
  
      it('should return posts when only categoryId is provided', async () => {
        const query: GetPostsQuery = { categoryId: '1' };
        const mockPosts:Post[] = [
          { id: '1', title: 'Post 1',content: 'Content', categoryId: '1', userId: '1',createdAt: new Date(),updatedAt: new Date() },
          { id: '2', title: 'Post 2',content: 'Content', categoryId: '1', userId: '1',createdAt: new Date(),updatedAt: new Date() },
          { id: '3', title: 'Post 3',content: 'Content', categoryId: '1', userId: '1',createdAt: new Date(),updatedAt: new Date() }
        ];
        jest.spyOn(prismaService.post, 'findMany').mockResolvedValue(mockPosts);
  
        const result = await postService.getPosts(query);
        expect(result).toEqual(mockPosts);
      });
  
      it('should return posts when only search term is provided', async () => {
        const query: GetPostsQuery = { search: 'Post' };
        const mockPosts:Post[] = [
          { id: '1', title: 'Post 1',content: 'Content', categoryId: '1', userId: '1',createdAt: new Date(),updatedAt: new Date() },
          { id: '2', title: 'Post 2',content: 'Content', categoryId: '2', userId: '1',createdAt: new Date(),updatedAt: new Date() }
        ];
        jest.spyOn(prismaService.post, 'findMany').mockResolvedValue(mockPosts);
  
        const result = await postService.getPosts(query);
        expect(result).toEqual(mockPosts);
      });
    });
  
    describe('createPost', () => {
      it('should create a new post', async () => {
        const data: CreatePostDto = { title: 'New Post', content: 'Content', categoryId: '1' };
        const mockPost:Post = { id: '1', ...data, userId: '123',createdAt: new Date(),updatedAt: new Date() };
        jest.spyOn(prismaService.post, 'create').mockResolvedValue(mockPost);
  
        const result = await postService.createPost(data, '123');
        expect(result).toEqual(mockPost);
      });
    });
  
    describe('deletePost', () => {
      it('should delete a post', async () => {
        const mockPost:Post = { id: '1', title: 'Post 1',content: 'Content', categoryId: '1', userId: '1',createdAt: new Date(),updatedAt: new Date() };
        jest.spyOn(prismaService.post, 'delete').mockResolvedValue(mockPost);
  
        const result = await postService.deletePost('1');
        expect(result).toEqual(mockPost);
      });
    });
  
    describe('updatePost', () => {
      it('should update a post', async () => {
        const data: CreatePostDto = { title: 'Updated Post', content: 'Updated Content', categoryId: '1' };
        const mockPost:Post = { id: '1', ...data, userId: '123',createdAt: new Date(),updatedAt: new Date() };
        jest.spyOn(prismaService.post, 'update').mockResolvedValue(mockPost);
  
        const result = await postService.updatePost('1', data);
        expect(result).toEqual(mockPost);
      });
    });
  });
