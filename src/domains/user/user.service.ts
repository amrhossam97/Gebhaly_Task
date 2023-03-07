import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddAddressDto, OneAddressDto } from 'src/common/dto/add_address.dto';
import { changePasswordDto } from 'src/common/dto/change_password.dto';
import { HandleErrorMessage } from 'src/common/exceptions/error-filter';
import {
  hashPassword,
  validatePassword,
} from 'src/common/helpers/hashPassword';
import { UserInterface } from 'src/common/interfaces/users.interface';
import Types from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private userModel: Model<UserInterface>) {}

  async changePassword(userId, body: changePasswordDto) {
    try {
      let user = await this.userModel.findById(userId);
      if (!user) throw new NotFoundException('User Not Found');
      const validPassword = await validatePassword(
        body.oldPassword,
        user.password,
      );
      if (!validPassword)
        throw new BadRequestException('Wrong Password please try again');
      user.password = await hashPassword(body.newPassword);
      await user.save();
      return true;
    } catch (e) {
      throw new HttpException(HandleErrorMessage(e), e.status ? e.status : 500);
    }
  }
  async deleteUser(id: string) {
    try {
      let user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException('User Not Found');
      user.deleteOne();
      return true;
    } catch (e) {
      throw new HttpException(HandleErrorMessage(e), e.status ? e.status : 500);
    }
  }
  async getUserById(id: string) {
    try {
      let user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException('User Not Found');
      console.log(user);
      
      return {
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        gender: user.gender,
        address: user.address,
      };
    } catch (e) {
      throw new HttpException(HandleErrorMessage(e), e.status ? e.status : 500);
    }
  }
  async addAddress(body: AddAddressDto, id: string) {
    try {
      let user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException('User Not Found');
      for (let address of body.addresses) {
        user.address.push({
          full_address: address.full_address,
          city: address.city,
          gov: address.gov,
          flatNo: address.flatNo,
          postalCode: address.postalCode,
        });
      }
      await user.save();
    } catch (e) {
      throw new HttpException(HandleErrorMessage(e), e.status ? e.status : 500);
    }
  }
  async updateAddress(body: OneAddressDto, id: string) {
    try {
      let isObjectId = Types.isValidObjectId(id);
      if (!isObjectId)
        throw new BadRequestException(
          'Wrong Id Please Try Again With Valid Id',
        );
      let user = await this.userModel.findOne({ 'address._id': id });
      if (!user) throw new NotFoundException('User Not Found');
      let address = user.address.find((a) => a['_id'] == id);
      if (!address) throw new NotFoundException('Address Not Found');

      await this.userModel.updateOne(
        { 'address._id': address },
        {
          $set: {
            'address.$.full_address': body.full_address
              ? body.full_address
              : address.full_address,
            'address.$.city': body.city ? body.city : address.city,
            'address.$.gov': body.gov ? body.gov : address.gov,
            'address.$.postalCode': body.postalCode
              ? body.postalCode
              : address.postalCode,
            'address.$.flatNo': body.flatNo ? body.flatNo : address.flatNo,
          },
        },
      );
      return true;
    } catch (e) {
      throw new HttpException(HandleErrorMessage(e), e.status ? e.status : 500);
    }
  }
}
