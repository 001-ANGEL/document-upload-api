import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { AuthValidation } from 'src/auth/providers/auth-validation.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { FileSchema } from './schema/document.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: 'File', schema: FileSchema },
      ]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, AuthValidation],
  exports: [DocumentService],
})
export class DocumentModule {}
