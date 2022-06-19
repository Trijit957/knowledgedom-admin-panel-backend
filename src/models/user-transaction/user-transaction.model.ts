import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.model';

export type UserTransactionDocument = UserTransaction & Document;

@Schema({
  versionKey: false
})
export class UserTransaction {

  @Prop({
      type: Number,
      required: true
  })
  amount: number;

  @Prop({
      type: Types.ObjectId,
      required: true,
      ref: User.name
  })
  userId: Types.ObjectId;
  
  @Prop(raw({
      code: {
          type: Number,
          required: true,
          unique: true
      },
      name: {
          type: String,
          required: true,
      }
    }))
  categoryInfo: {
        code: number;
        name: string;
  }

  @Prop(raw({
    code: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    } 
  }))
  typeInfo: {
        code: number;
        name: string;
  }

  @Prop({
    type: String,
    default: null
  })
  description: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false
  })
  isRepeat: boolean;

  @Prop({
    type: String,
    default: null
  })
  frequency: string;

  @Prop(raw({
      month: {
          type: Number,
          default: null
      },
      date: {
          type: Number,
          default: null
      }
  }))
  intervalInfo: {
        month: number,
        date: number
  }

  @Prop({
    type: Date,
    required: true,
    default: Date.now
  })
  createdAt: string;
}

export const UserTransactionSchema = SchemaFactory.createForClass(UserTransaction);

