import { IsNotEmpty, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userName: string;
    
    @IsNotEmpty()
    @IsStrongPassword({
        minLowercase: 1,
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 1
    }, { message: 'Enter a strong password' })
    @MinLength(8)
    @MaxLength(32)
    password: string;
}

export class LoginCredentialsDto {
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;
}