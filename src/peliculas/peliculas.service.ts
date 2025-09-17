import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pelicula } from './entities/pelicula.entity';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectModel(Pelicula.name) private peliculaModel: Model<Pelicula>,
    private readonly userService: UsersService,
  ) {}

  async create(peli: CreatePeliculaDto) {
    const user = await this.userService.findByOne(peli.user);
    if (!user)
      throw new NotFoundException(`Usuario con id: ${user} no encontrado`);

    const pelicula = new this.peliculaModel({
      ...peli,
      user: user._id,
    });
    return pelicula.save();
  }

  findAll() {
    return this.peliculaModel.find().populate('user', 'name email');
  }

  findOneName(title: string) {
    return this.peliculaModel
      .find({
        title: { $regex: title, $options: 'i' },
      })
      .exec();
  }

  updatePelis(
    id: string,
    updateData: Partial<{ title: string; director: string; year: number }>,
  ) {
    return this.peliculaModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  deletePelis(id: string) {
    return this.peliculaModel.findByIdAndDelete(id);
  }
}
