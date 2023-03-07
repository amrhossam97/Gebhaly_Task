import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEnum,
  IsPhoneNumber,
  Length,
  Matches,
  IsEmail,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';

export const letterRegex = new RegExp('^(?=.*[a-zA-Z])'),
  digitRegex = new RegExp('^(?=.*[0-9])');
export class AddUsersDto {
  @ApiProperty({example:'Amr Hossam'})
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @ApiProperty({example:'+201095047883'})
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({example:'amrhossam60@hotmail.com'})
  @IsEmail()
  readonly email: string;

  @ApiProperty({example:Gender.MALE})
  @IsEnum(Gender)
  @IsNotEmpty()
  readonly gender: Gender;

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
  readonly password: string;
}
