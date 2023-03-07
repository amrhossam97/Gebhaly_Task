import { Document } from 'mongoose';
import { Gender } from '../enums/gender.enum';
import { AddressInterFace } from './address.interface';
export interface UserInterface extends Document{
     name: string;
     phoneNumber: string;
     email: string;
     password: string;
     gender: Gender;
     access_token: string;
     address:AddressInterFace[];
}