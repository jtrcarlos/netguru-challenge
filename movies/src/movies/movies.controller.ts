import {Controller, Get, UseGuards, Headers, Req, Body, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {MoviesService} from "./movies.service";
import {MovieTitleDto} from "./dto/movieTitle.dto";
import {Movie} from "./movie.schema";
import {ApiCreatedResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {
    }
    @Post()
    @ApiCreatedResponse({description: "Movie created", type: Movie})
    @ApiUnauthorizedResponse({description: "Need authorization in order to create a movie"})
    @ApiBearerAuth()
    @ApiTags('movies')
    @UseGuards(AuthGuard)
    createMovie(@Req() req, @Body() movieTitle: MovieTitleDto): Promise<Movie> {
        const {title} = movieTitle;
        if (!title) throw new HttpException('Movie title necessary', HttpStatus.BAD_REQUEST);

        return this.moviesService.addMovie(req.user, title);
    }

    @Get()
    @ApiTags('movies')
    @ApiOkResponse({description: "Get all movies", type: [Movie]})
    getMovies(): Promise<Movie[]> {
        return this.moviesService.getAllMovies();
    }
}
