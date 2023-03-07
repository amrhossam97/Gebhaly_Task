import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto{

    @ApiProperty({example:'amrhossam60@hotmail.com'})
    @IsEmail()
    readonly email: string;

    @ApiProperty({ format: 'password' ,example:'amrhossam123'})
    @IsString()
    @IsNotEmpty()
    readonly password: string;

}