import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {

  @Prop({ required: true })
  title: string;

  @Prop()
  released: Date;

  @Prop()
  genre: string;

  @Prop()
  director: string;

  @Prop({ required: true })
  user_id: number;

}

export const MovieSchema = SchemaFactory.createForClass(Movie);
