import {Controller, Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";

@Controller('movies')
export class MoviesController {

    @Get()
    @UseGuards(AuthGuard)
    getMovies(){
        return "lel";
    }
}
