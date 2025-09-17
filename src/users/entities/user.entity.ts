import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ require: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Note' }] })
  notes: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
