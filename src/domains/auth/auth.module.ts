import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { UsersSchema } from 'src/database/schemas/users.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    JwtModule.register({
      secret: `Gebhaly`,
      signOptions: { expiresIn: 3600 },
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
