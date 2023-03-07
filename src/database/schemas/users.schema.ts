import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from 'src/common/enums/gender.enum';
import { now } from 'mongoose';
import { AddressInterFace } from 'src/common/interfaces/address.interface';

@Schema({ timestamps: true, collection: 'Users' })
export class Users {
  @Prop({ type: String, maxlength: 100, minlength: 10, required: true })
  name: string;
  @Prop({
    type: String,
    maxlength: 20,
    minlength: 10,
    required: true,
    unique: true,
  })
  phoneNumber: string;
  @Prop({ type: String, maxlength: 100, min: 15, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ enum: Gender, type: String, default: Gender.MALE, required: true })
  gender: Gender;
  @Prop({ type: String, default: null, required: false })
  access_token: string;
  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
  @Prop({
    type: [
      {
        full_address: { type: String, maxlength: 200 },
        gov: { type: String, maxlength: 20 },
        city: { type: String, maxlength: 20 },
        flatNo: { type: Number, maxlength: 4 },
        postalCode: { type: Number, maxlength: 10 },
      },
    ],
  })
  address: AddressInterFace[];
}
export const UsersSchema = SchemaFactory.createForClass(Users);
