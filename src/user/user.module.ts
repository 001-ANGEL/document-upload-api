import { Module } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserValidation } from './providers/userValidation.provider';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [],
  providers: [UserService, UserValidation],
  exports: [UserService],
})
export class UserModule {}
