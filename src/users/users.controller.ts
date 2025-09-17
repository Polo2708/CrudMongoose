import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NotesService } from 'src/notes/notes.service';

@Controller('/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private notesService: NotesService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/nombre')
  findByName(@Query('name') name: string) {
    return this.usersService.findByName(name);
  }

  @Get()
  getNotesForId(@Query('id') userId: string) {
    return;
  }
}
