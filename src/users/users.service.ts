import { Injectable } from '@nestjs/common';
import { NewUserInput, UpdateUserInput } from './dtos';
import { User } from './models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly usersModel: Model<User>) {}
  async create(user: NewUserInput): Promise<User> {
    const newUser = new this.usersModel(user);
    return await newUser.save();
  }

  async getUsers(): Promise<User[]> {
    const listUsers = await this.usersModel
      .find()
      .where({ status: 'active' })
      .exec();
    listUsers.map((usr) => {
      delete usr.password;
      return usr;
    });

    return listUsers;
  }
  async updateUser(user: UpdateUserInput): Promise<User> {
    const { password } = user;
    user.password = await this.hashePassword(password);
    return await this.usersModel.findByIdAndUpdate(user.id, user, {
      new: true,
    });
  }

  async inactivateUser(id: string): Promise<User> {
    return await this.usersModel.findByIdAndUpdate(
      id,
      { status: 'inactive' },
      { new: true },
    );
  }

  private async hashePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
  }
}
