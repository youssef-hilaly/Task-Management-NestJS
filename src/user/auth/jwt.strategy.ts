import { JwtPayload } from './../../../node_modules/@types/jsonwebtoken/index.d';
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('USER_REPOSITORY')
    private readonly usersRepository: typeof User) {
        super({
            secretOrKey: 'topSecret101',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
     }

     async validate(payload: JwtPayload): Promise<User>{
        const { username } = payload;

        const user =  this.usersRepository.findOne({where: {userName: username}});
        
        if(!user){
            throw new UnauthorizedException();
        }
        return user
    }
}