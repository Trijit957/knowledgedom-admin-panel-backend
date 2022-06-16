import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Category, CategorySchema } from '../transaction/category.model';

export type UserDocument = User & Document;

@Schema({
  versionKey: false
})
export class User {

  @Prop({
    type: String,
    required: true
  }) 
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  profilePictureUrl: string;

  @Prop({
    type: Date,
    required: true,
    default: Date.now
  })
  createdAt: string;

  @Prop({
    type: Date,
    required: true,
    default: Date.now
  })
  lastLoggedInAt: string;

  @Prop({
    type: [CategorySchema],
    default: []
  })
  categories: Array<Category> | []; 

}

export const UserSchema = SchemaFactory.createForClass(User);

