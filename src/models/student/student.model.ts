import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false
})
export class Student {

  @Prop({
    type: String,
    required: true
  }) 
  name: string;

  @Prop({
    type: String,
    required: true
  })
  gender: string;

  @Prop({
    type: String,
    required: true
  })
  class: string;

  @Prop({
    type: String,
    required: true
  })
  school: string;

  @Prop({
    type: String,
    required: true
  })
  board: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    minlength: 10,
    maxlength: 10
  })
  phone: string;

  @Prop({
    type: String,
    required: true
  })
  guardianName: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    minlength: 10,
    maxlength: 10
  })
  guardianPhone: string;

  @Prop({
    type: Date,
    required: true,
    default: Date.now
  })
  addedAt: string; 

}

export type StudentDocument = Student & Document;

export const StudentSchema = SchemaFactory.createForClass(Student);

