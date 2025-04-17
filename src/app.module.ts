import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { environmentValidation } from './config/environment.validation';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { DocumentController } from './document/document.controller';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: environmentValidation,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongoUri'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    DocumentModule,
  ],
  controllers: [DocumentController],
  providers: [],
})
export class AppModule {}
