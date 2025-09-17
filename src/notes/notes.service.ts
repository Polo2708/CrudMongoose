import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from './entities/note.entity';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes.name) private noteModel: Model<Notes>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(data: { nota: string }) {
    const newNote = await this.noteModel.create(data);

    if (!newNote.nota)
      throw new InternalServerErrorException('No se puede guardar');
    return await newNote.save();
  }

  async getALlNoe() {
    return this.noteModel.find().exec();
  }

  async createNoteForUser(userId: string, CreateNoteDto: CreateNoteDto) {
    const note = new this.noteModel({ ...CreateNoteDto, user: userId });
    const savedNote = await note.save();

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { notes: savedNote._id },
    });

    return savedNote;
  }

  async getUserWithNote(userId: string) {
    return this.userModel.findById(userId).populate('notes').exec();
  }
}
