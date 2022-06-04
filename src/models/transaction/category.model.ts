import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false
})
export class Category extends Document {
  @Prop({
    type: Number,
    required: true,
    unique: true
  })
  categoryCode: number;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  iconImageUrl: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);



