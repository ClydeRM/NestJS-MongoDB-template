import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.DBConnect.env' }), // Include .env variable
    MongooseModule.forRoot(process.env.Mongo_URI), // Use env Mongo_URI
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
