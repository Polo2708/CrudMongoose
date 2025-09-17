import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(usuario: CreateUserDto) {
    return await this.userModel.create(usuario);
  }

  async getAllUsers() {
    return this.userModel.find().populate('notes').exec();
  }

  async findByOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findByName(name: string): Promise<User[]> {
    return this.userModel.find({ name }).populate('notes').exec();
  }
}
