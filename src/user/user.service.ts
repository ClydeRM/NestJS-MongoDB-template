import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { UserDto } from './Dto/user.dto'; // Request
import { UserDoc } from './interfaces/user-document.interface'; // DB
import { User } from './interfaces/user.interface'; // Response

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDoc>,
  ) {}

  async getAll(): Promise<User[]> {
    const userDocs = await this.userModel.find().exec(); // exec(callBack())
    return userDocs.map((doc) => ({
      userId: doc.userId,
      googleId: doc.googleId,
      displayName: doc.displayName,
      firstName: doc.firstName,
      lastName: doc.lastName,
      image: doc.image,
      createdAt: doc.createdAt,
    }));
  }

  async getOne(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ userId: userId }).exec();
    return {
      userId: user.userId,
      googleId: user.googleId,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      createdAt: user.createdAt,
    };
  }

  async createOne(user: UserDto): Promise<User> {
    // eslint-disable-next-line prefer-const
    let newUser = {
      ...user,
      userId: uuid(),
      createAt: Date.now(),
    };
    const createUser = await this.userModel.create(newUser);
    return {
      userId: createUser.userId,
      googleId: createUser.googleId,
      displayName: createUser.displayName,
      firstName: createUser.firstName,
      lastName: createUser.lastName,
      image: createUser.image,
      createdAt: createUser.createdAt,
    };
  }

  async updateOne(userId: string, user: UserDto): Promise<User> {
    const foundUser = await this.userModel
      .findOneAndUpdate({ userId: userId }, user, { returnDocument: 'after' })
      .exec();
    return {
      userId: foundUser.userId,
      googleId: foundUser.googleId,
      displayName: foundUser.displayName,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      image: foundUser.image,
      createdAt: foundUser.createdAt,
    };
  }

  async deleteOne(
    userId: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.userModel.remove({ userId });
      return { deleted: true };
    } catch (error) {
      return { deleted: false, message: error.message };
    }
  }
}
