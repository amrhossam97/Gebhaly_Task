import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddUsersDto } from 'src/common/dto/add_users.dto';
import { AuthService } from './auth.service';
import * as message from '../../common/messages/messages';
import { HandleErrorMessage } from 'src/common/exceptions/error-filter';
import { SignInDto } from 'src/common/dto/sign_in.dto';
import { changePasswordDto } from 'src/common/dto/change_password.dto';
import { User } from 'src/common/decorateros/user.decorator';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async Register(@Body() body: AddUsersDto) {
    try {
      await this.authService.Register(body);
      return { message: message.REGISTER_SUCCESS };
    } catch (e) {
      throw new HttpException(HandleErrorMessage(e), e.status ? e.status : 500);
    }
  }
  @Post('/login')
  async Login(@Body() body: SignInDto) {
    try {
      let result = await this.authService.login(body);
      return { message: message.LOGIN_SUCCESS , result };
    } catch (e) {
      throw new HttpException(HandleErrorMessage(e), e.status ? e.status : 500);
    }
  }
}
