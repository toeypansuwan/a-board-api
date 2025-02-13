import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class PostEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    categoryId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty({ type: [CommentEntity] })
    comments: CommentEntity[];

    @ApiProperty({ type: UserEntity})
    user: UserEntity;

    @ApiProperty({ type: Category })
    category: Category;
} 