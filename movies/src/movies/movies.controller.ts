import {Controller, Get, UseGuards, Headers, Req, Body, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {MoviesService} from "./movies.service";

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    createMovie(@Req() req, @Body() {title}){
        console.log(title)
        if (!title) throw new HttpException('Movie title necessary', HttpStatus.BAD_REQUEST);

        return this.moviesService.addMovie(req.user, title);
    }

    @Get()
    getMovies(){
        return this.moviesService.getAllMoves();
    }
}
