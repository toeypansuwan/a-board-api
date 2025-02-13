/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { SignInResponse } from './entities/sign-in.response';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //signin by username with generate jwt token
    @Post('signin')
    @ApiOperation({ operationId: 'signin' })
    @ApiResponse({
        type: SignInResponse,
        status: 200,
        description: 'Sign in',
    })
    signin(@Body() body: SignInDto) {
        return this.authService.signin(body.username);
    }

    //get me
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('me')
    @ApiOperation({ operationId: 'getMe' })
    @ApiResponse({
        type: UserEntity,
        status: 200,
        description: 'Get me',
    })
    getMe(@Request() req: any) {
        return this.authService.getMe(req.user.id);
    }
    //
}
