import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { FileSchema } from './schema/document.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'File', schema: FileSchema },
    ]),
    AuthModule,
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [
    DocumentService,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
})
export class DocumentModule {}
