import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Category, CategorySchema } from './category.model';

export type TransactionDocument = Transaction & Document;

@Schema({
  versionKey: false
})
export class Transaction {

  @Prop({
    type: Number,
    required: true,
    unique: true
  }) 
  typeCode: number;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  typeName: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  iconImageUrl: string;
  
  @Prop({
    type: [CategorySchema],
    default: []
  })
  categories: Array<Category> | [];

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

