import { ApiProperty } from '@nestjs/swagger';

export class GetPostsQuery {
    @ApiProperty({ required: false })
    categoryId?: string;

    @ApiProperty({ required: false })
    search?: string;
} 