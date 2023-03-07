import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import * as message from '../../common/messages/messages';
import { HandleErrorMessage } from 'src/common/exceptions/error-filter';
import { changePasswordDto } from 'src/common/dto/change_password.dto';
import { User } from 'src/common/decorateros/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AddAddressDto, OneAddressDto } from 'src/common/dto/add_address.dto';
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/update_password')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async updatePassword(@Body() body: changePasswordDto, @User() user) {
    try {
      if (body.newPassword != body.confirmPassword)
        throw new BadRequestException(
          'Password and Confirm Password Does Not Match',
        );
      let result = await this.userService.changePassword(user.userId, body);
      return { message: message.CHANGE_PASSWORD_SUCCESSFULLY, result };
    } catch (e) {
      throw new HttpException(HandleErrorMessage(e), e.status ? e.status : 500);
    }
  }
  @Delete('/delete_my_account')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@User() user) {
    await this.userService.deleteUser(user.userId);
    return { message: message.DELETED_SUCCESS };
  }
  @Get('/getUserProfile')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@User() user) {
    let result = await this.userService.getUserById(user.userId);
    return { result, message: message.GET_USER_PROFILE };
  }
  @Post('/addAddress')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async addAddress(@User() user, @Body() body: AddAddressDto) {
    let result = await this.userService.addAddress(body,user.userId);
    return { result, message: message.ADD_USER_ADDRESS };
  }
  @Put('/updateAddress/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async updateAddress(@Param('id') id:string, @Body() body: OneAddressDto) {
    let result = await this.userService.updateAddress(body,id);
    return { result, message: message.UPDATE_USER_ADDRESS };
  }
}
