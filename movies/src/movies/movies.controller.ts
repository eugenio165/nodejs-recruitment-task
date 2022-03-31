import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { ReqUser } from 'src/auth/req-user.decorator';
import { JwtPayload } from './../auth/jwt-payload.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

@Auth()
@Controller('movies')
export class MoviesController {

  constructor(
    private readonly moviesService: MoviesService,
  ) { }

  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @ReqUser() userData: JwtPayload,
  ) {
    let omdbMovieData = await this.moviesService.getOMDbInfo(createMovieDto.title);

    const movieToCreate = {
      ...createMovieDto,
      ...omdbMovieData,
      user_id: userData.userId,
    };

    return this.moviesService.create(movieToCreate);
  }

  @Get()
  findAll(
    @ReqUser() userData: JwtPayload,
  ) {
    // Obviously would paginate, limit, etc.
    return this.moviesService.find({
      user_id: userData.userId,
    });
  }

}
