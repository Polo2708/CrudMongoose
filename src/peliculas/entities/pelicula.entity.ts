import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Pelicula {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  year: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;
}

export const MovieSchema = SchemaFactory.createForClass(Pelicula);
