import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked_token'),
          },
        },
        AuthService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signin', () => {
    it('should return a token if user exists', async () => {
      const mockUser: User = {
        id: '1',
        name: 'testUser',
        image: 'image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await authService.signin('testUser');

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { name: 'testUser' },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: mockUser.id,
        name: mockUser.name,
      });
      expect(result).toEqual({ access_token: 'mocked_token' });
    });

    it('should create a new user and return a token if user does not exist', async () => {
      const mockUser = {
        id: '2',
        name: 'newUser',
        image: 'https://robohash.org/newUser',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const result = await authService.signin('newUser');

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: { name: 'newUser', image: 'https://robohash.org/newUser' },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: mockUser.id,
        name: mockUser.name,
      });
      expect(result).toEqual({ access_token: 'mocked_token' });
    });
  });

  describe('getMe', () => {
    it('should return user data if found', async () => {
      const mockUser = {
        id: '1',
        name: 'testUser',
        image: 'url',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await authService.getMe('1');

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await authService.getMe('999');

      expect(result).toBeNull();
    });
  });
});
