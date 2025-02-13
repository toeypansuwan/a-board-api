import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    image: string;
    
    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
} 