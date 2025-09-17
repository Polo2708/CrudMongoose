import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  createNote(@Body() body: { userId: string; title: string; content: string }) {
    return this.notesService.createNote(body.userId, body.title, body.content);
  }

  @Get('user/:id')
  getByUser(@Param('id') id: string) {
    return this.notesService.getNoteByUserId(id);
  }
  // @Post()
  // createNote(
  //   @Query('userId') userId: string,
  //   @Body() CreateNoteDto: CreateNoteDto,
  // ) {
  //   return this.notesService.createNoteForUser(userId, CreateNoteDto);
  // }

  // @Get()
  // getNotes() {
  //   return this.notesService.getALlNoe();
  // }

  // @Get(':id')
  // getOneNote(@Param('id') id: string) {
  //   return this.notesService.getNoteByUserId(id);
  // }
}
