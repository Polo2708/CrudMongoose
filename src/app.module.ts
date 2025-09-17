import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { PeliculasModule } from './peliculas/peliculas.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/crud-nestjs'),
    NotesModule,
    UsersModule,
    PeliculasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
