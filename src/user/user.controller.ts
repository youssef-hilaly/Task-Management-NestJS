import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialsDto, LoginCredentialsDto } from './auth/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/signup')
    createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userService.createUser(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: LoginCredentialsDto): Promise<{accessToken: string}> {
        return this.userService.signIn(authCredentialsDto);
    }
}
