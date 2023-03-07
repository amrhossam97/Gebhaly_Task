import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddUsersDto } from 'src/common/dto/add_users.dto';
import { SignInDto } from 'src/common/dto/sign_in.dto';
import { Encript } from 'src/common/encription/encription';
import {
  hashPassword,
  validatePassword,
} from 'src/common/helpers/hashPassword';
import { UserInterface } from 'src/common/interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';
import { HandleErrorMessage } from 'src/common/exceptions/error-filter';
import { changePasswordDto } from 'src/common/dto/change_password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private userModel: Model<UserInterface>,
    private readonly jwtService: JwtService,
  ) {}
  async Register(body: AddUsersDto): Promise<UserInterface> {
    const { name, phoneNumber, email, gender } = body;
    let foundEmail = await this.userModel.findOne({ email });
    if (foundEmail)
      throw new BadRequestException('This Email Was Already Registerd');
    let foundPhone = await this.userModel.findOne({ phoneNumber });
    if (foundPhone)
      throw new BadRequestException('This Phone Number Was Already Registerd');
    const password = await hashPassword(body.password);
    const newStudent = await new this.userModel({
      name,
      phoneNumber,
      email,
      gender,
      password,
    });
    return newStudent.save();
  }
  async login(body: SignInDto) {    
    const { password, email } = body;
    let user = await this.userModel.findOne({ email });
    if (!user)
      throw new NotFoundException(
        'Wrong Email Please Try Again With Correct Emal',
      );
    let passwordCheck = await validatePassword(password, user.password);
    if (!passwordCheck)
      throw new BadRequestException('Email Or Password Wrong ');
    //JWT Encripted Token
    const iv = process.env.ENCRIPT_IV;
    const key = process.env.ENCRIPT_KEY;    
    const payload = {
      userName: Encript(user.name, key, iv),
      userPhone: Encript(user.phoneNumber, key, iv),
      userId: Encript(user.id, key, iv),
    };
    const access_token = this.jwtService.sign(payload);
    user.access_token = access_token;
    await user.save()
    return{access_token:user.access_token }
  }

}
