import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { CategoryService } from "./category.service";
import { Category } from "@prisma/client";

describe('CategoryService', () => {
    let categoryService: CategoryService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoryService, {
                provide: PrismaService,
                useValue: {
                    category: {
                        findMany: jest.fn(),
                    },
                },
            }],
        }).compile();
        categoryService = module.get<CategoryService>(CategoryService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(categoryService).toBeDefined();
    });
    
    it('should return an array of categories if categories are found', async () => {
        // mock
        const mockCategories:Category[] = [
            { id: "1", name: 'History',createdAt: new Date(),updatedAt: new Date() },
            { id: "2", name: 'Food',createdAt: new Date(),updatedAt: new Date() },
        ];
        jest.spyOn(prisma.category, 'findMany').mockResolvedValue(mockCategories);
        expect(await categoryService.getCategories()).toEqual(mockCategories);
    })

    it('should return an empty array if no categories are found', async () => {
        jest.spyOn(prisma.category, 'findMany').mockResolvedValue([]);
        expect(await categoryService.getCategories()).toEqual([]);
    })
})