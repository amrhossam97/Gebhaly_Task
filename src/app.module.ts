import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersSchema } from './database/schemas/users.schema';
import { AuthModule } from './domains/auth/auth.module';
import { UserModule } from './domains/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'GebhalyDb'}),
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
