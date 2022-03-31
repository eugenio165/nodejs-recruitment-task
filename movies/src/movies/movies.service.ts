import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { AppConfigService } from 'src/config/app-config.service';
import { Movie, MovieDocument } from './movie.schema';
import { IOMDbMovie } from './omdb-movie.interface';

@Injectable()
export class MoviesService {

  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
    private readonly httpService: HttpService,
    private readonly cfg: AppConfigService,
  ) { }

  async create(data: Partial<Movie>) {
    const movieToCreate = plainToInstance(Movie, data);
    const errors = await validate(movieToCreate);
    if (errors.length > 0) {
      // Would improve this sending back validation information like the validation pipe does
      throw new BadRequestException('There was a problem creating the movie');
    }

    const movie = new this.movieModel(movieToCreate);
    return movie.save();
  }

  find(filter: FilterQuery<Movie>, options?: QueryOptions) {
    return this.movieModel.find(filter, null, options);
  }

  /**
   * Retreives movie information using the title of the movie from OMDb API
   * @param title Movie title
   * @returns Movie information from OMDb
   */
  async getOMDbInfo(title: string) {
    // Since nestjs httpmodule works with observables, need to transform into promise
    const res = await firstValueFrom(
      this.httpService.get<IOMDbMovie>('http://www.omdbapi.com/', {
        params: {
          apikey: this.cfg.OMDbApiKey,
          t: title,
          type: 'movie',
        }
      })
    ).catch((_) => {
      throw new BadRequestException('There was a problem retrieving information about the movie');
    })

    if (res.data.Error) {
      throw new BadRequestException(res.data.Error);
    }

    return <Partial<Movie>>{
      title: res.data.Title,
      director: res.data.Director,
      genre: res.data.Genre,
      released: (res.data.Released) ? new Date(res.data.Released) : null,
    };
  }

}
