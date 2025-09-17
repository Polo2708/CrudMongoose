import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  createNote(@Body() body: { userId: string; title: string; content: string }) {
    return this.notesService.createNote(body.userId, body.title, body.content);
  }

  @Patch(':id')
  updateNotesById(
    @Param('id') id: string,
    @Body() body: { title: string; content: string },
  ) {
    return this.notesService.updateNotes(id, body.title, body.content);
  }

  @Get()
  getAllNotes() {
    return this.notesService.getAllNotes();
  }

  @Get('user/:id')
  getByUser(@Param('id') id: string) {
    return this.notesService.getNoteByUserId(id);
  }

  @Get('title/:title')
  getNoteForTitle(@Param('title') title: string) {
    console.log(title);
    return this.notesService.getNotesForTitle(title);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    const clean = this.notesService.cleanNote(id);
    if (!clean) {
      return { message: `Nota con id ${id} no encontrada` };
    }

    return { message: `Nota eliminada correctamente` };
  }
}
