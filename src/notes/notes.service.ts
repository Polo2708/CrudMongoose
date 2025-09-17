import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from './entities/note.entity';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes.name) private noteModel: Model<Notes>) {}

  async createNote(userId: string, title: string, content: string) {
    const note = new this.noteModel({ user: userId, title, content });
    return note.save();
  }

  async getNoteByUserId(userId: string) {
    return this.noteModel.find({ user: userId }).populate('user').exec();
  }
}
