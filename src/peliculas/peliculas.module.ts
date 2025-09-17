import { Module } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { PeliculasController } from './peliculas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema, Pelicula } from './entities/pelicula.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pelicula.name, schema: MovieSchema }]),
    UsersModule,
  ],
  controllers: [PeliculasController],
  providers: [PeliculasService],
})
export class PeliculasModule {}
