import { PrismaService } from '../prisma/prisma.service';
import { CommentService } from './comment.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Comment } from '@prisma/client';

describe('CommentService', () => {
  let commentService: CommentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: PrismaService,
          useValue: {
            comment: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(commentService).toBeDefined();
  });

  describe('createComment', () => {
    it('should create comment and return it', async () => {
      const userId = '1';
      const postId = '1';

      const mockComment: Comment = {
        id: '1',
        content: 'test',
        postId: '1',
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.comment, 'create').mockResolvedValue(mockComment);
      const comment = await commentService.createComment(
        { content: 'test' },
        postId,
        userId,
      );

      expect(comment).toBeDefined();
      expect(comment).toEqual(mockComment);
    });
  });
});
