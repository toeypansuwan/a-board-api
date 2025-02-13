import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';

export class CommentEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    postId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty({ type: UserEntity })
    user: UserEntity;
} 