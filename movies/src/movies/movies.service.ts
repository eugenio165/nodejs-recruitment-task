import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie, MovieDocument } from './movie.schema';

@Injectable()
export class MoviesService {

  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
  ) { }

  create(createMovieDto: CreateMovieDto) {
    const createdCat = new this.movieModel(createMovieDto);
    return createdCat.save();
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

}
