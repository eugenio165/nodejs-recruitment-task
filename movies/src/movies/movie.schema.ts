import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  // Would define min, max length if necessary
  title: string;

  @Prop()
  @IsDate()
  @IsOptional()
  released: Date;

  @Prop()
  @IsString()
  @IsOptional()
  // Would define min, max length if necessary
  genre: string;

  @Prop()
  @IsString()
  @IsOptional()
  // Would define min, max length if necessary
  director: string;

  @Prop({ required: true })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  user_id: number;

}

export const MovieSchema = SchemaFactory.createForClass(Movie);
MovieSchema.index({ user_id: 1, title: 1 }, { unique: true });
