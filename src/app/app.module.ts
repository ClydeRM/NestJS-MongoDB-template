import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.DBConnect.env' }), // Include .env variable
    MongooseModule.forRoot(process.env.Mongo_URI), // Use env Mongo_URI
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
