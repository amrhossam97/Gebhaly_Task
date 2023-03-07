import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { digitRegex, letterRegex } from "./add_users.dto";

export class changePasswordDto{

    @ApiProperty({ format: 'password' ,example:'amrhossam123'})
    @Length(8, 50, {
        message: 'Weak Password , length must be more than 8',
      })
      @Matches(letterRegex, {
        message: 'Weak Password , password must contain at least one letter',
      })
      @Matches(digitRegex, {
        message: 'Weak Password , password must contain at least one letter',
      })
    readonly newPassword: string;

    @ApiProperty({ format: 'password' ,example:'amrhossam123'})
    @IsString()
    @IsNotEmpty()
    readonly confirmPassword: string;

    @ApiProperty({ format: 'password' ,example:'amrhossam123'})
    @IsString()
    @IsNotEmpty()
    readonly oldPassword: string;
}