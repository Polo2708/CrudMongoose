import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from './entities/note.entity';
import { DeleteResult, Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes.name) private noteModel: Model<Notes>) {}

  async createNote(userId: string, title: string, content: string) {
    const note = new this.noteModel({ user: userId, title, content });
    return note.save();
  }

  async updateNotes(id: string, title?: string, content?: string) {
    return this.noteModel
      .findByIdAndUpdate(id, { title, content }, { new: true })
      .populate('user', 'name email');
  }

  async getNoteByUserId(userId: string) {
    return this.noteModel.find({ user: userId }).populate('user').exec();
  }

  async getNotesForTitle(title: string) {
    return this.noteModel.find({ title }).populate('user', 'name email').exec();
  }

  async getAllNotes() {
    await this.noteModel.deleteMany({ user: { $exists: false } }).exec();
    return this.noteModel.find().populate('user', 'name email').exec();
  }

  async cleanNote(id: string): Promise<DeleteResult> {
    return this.noteModel.deleteOne({ _id: id }).exec();
  }
}
