import { PickType } from "@nestjs/swagger";
import { Movie } from "../movie.schema";

export class CreateMovieDto extends PickType(Movie, ['title']) {


}
