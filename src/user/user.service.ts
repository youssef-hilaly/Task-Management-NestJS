import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { AuthCredentialsDto, LoginCredentialsDto } from './auth/auth-credentials.dto';
import { Injectable, Inject, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY')
    private readonly usersRepository: typeof User,
        private jwtService: JwtService) { }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { userName, password } = authCredentialsDto;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);
        try {
            await this.usersRepository.create({ userName, password: hashedPassword });
        } catch (error) {
            if (error.parent.code === '23505') {
                // duplicate username
                throw new ConflictException('Username already exist');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialsDto: LoginCredentialsDto): Promise<{accessToken: string}> {

        const { userName, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne({ where: { userName } });
        if (user && compare(password, user.password)) {
            const payload: JwtPayload = { username: userName };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken }
        }
        else {
            throw new UnauthorizedException('wrong username or password');
        }
    }

}
