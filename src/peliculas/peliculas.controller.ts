import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  @Post()
  create(@Body() peli: CreatePeliculaDto) {
    return this.peliculasService.create(peli);
  }

  @Get()
  findAll() {
    return this.peliculasService.findAll();
  }

  @Get('buscar/:title')
  findOne(@Param('title') title: string) {
    return this.peliculasService.findOneName(title);
  }

  @Patch(':id')
  updateMovie(
    @Param('id') id: string,
    @Body() body: { title?: string; director?: string; year?: number },
  ) {
    return this.peliculasService.updatePelis(id, body);
  }

  @Delete(':id')
  deletePelisById(@Param('id') id: string) {
    return this.peliculasService.deletePelis(id);
  }
}
