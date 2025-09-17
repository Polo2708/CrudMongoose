import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Notes' }] })
  notes: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
