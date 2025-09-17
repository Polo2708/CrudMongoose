import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  createNote(
    @Query('userId') userId: string,
    @Body() CreateNoteDto: CreateNoteDto,
  ) {
    return this.notesService.createNoteForUser(userId, CreateNoteDto);
  }

  @Get()
  getNotes() {
    return this.notesService.getALlNoe();
  }

  @Get('user-notes')
  getUserNote(@Query('userId') userId: string) {
    return this.notesService.getUserWithNote(userId);
  }
}
