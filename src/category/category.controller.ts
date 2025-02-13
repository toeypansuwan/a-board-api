/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    @ApiResponse({
        type: [Category],
        status: 200,
        description: 'Get all categories',
    })
    @ApiOperation({ operationId: 'getCategories' })
    async getCategories() {
        return await this.categoryService.getCategories();
    }
}
