import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose"
import {Movie, MovieDocument} from "./movie.schema";
import {MovieCreateDto} from "./dto/movieCreate.dto";
import {UserModel} from "../user/user.model";
import {UserLimit, UserLimitDocument} from "../user/userLimit.shema";


@Injectable()
export class MoviesService {
    constructor(private httpService: HttpService,
                @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
                @InjectModel(UserLimit.name) private userLimitModel: Model<UserLimitDocument>) {
    }

    async addMovie(userData: UserModel, movieTitle: string): Promise<Movie> {
        const apiKey = process.env.MOVIE_API_KEY;
        const foundMovieObs = this.httpService
            .get(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`);
        const foundMovieResponse = await firstValueFrom(foundMovieObs);

        // Check if API returned movie
        if (foundMovieResponse.data.Error) {
            throw new HttpException('Movie not found, check the title and try again', HttpStatus.NOT_FOUND);
        }

        // TODO check if movie is already in database ??
        // Check if movie exists in db
        const foundMovieInDb = await this.movieModel.findOne({
            Title:  foundMovieResponse.data.Title
        });
        if (foundMovieInDb) {
            throw new HttpException("Movie already in database", HttpStatus.FORBIDDEN);
        }

        // Basic user restrictions
        let user: UserLimit;
        if (userData.role === 'basic') {
            const userExists = await this.userLimitModel.findOne({
                userId: userData.userId
            });
            console.log(userExists);

            if (!userExists) {
                user = await new this.userLimitModel(
                    {
                        userId: userData.userId, limit: 5, limitDate: new Date()
                    }).save();
            } else {
                user = userExists;
            }

            // Reset the limit on month change
            if (new Date(user.limitDate).getMonth() !== new Date().getMonth()) {
                user = await this.userLimitModel.findOneAndUpdate({
                    userId: user.userId
                }, {$set: {limit: 5, limitDate: new Date()}}).exec();
                console.log(user)
            }

            // Check if limit ok
            if (user.limit - 1 < 0){
                throw new HttpException("Limit exceeded", HttpStatus.FORBIDDEN);
            }

            // Update limit
            await this.userLimitModel.findOneAndUpdate({userId: user.userId},{
                $set: {
                    limit: user.limit - 1
                }
            })
        }


        // const m = new Movie();
        // m.Title = foundMovieResponse.data.Title;
        // m.Released = foundMovieResponse.data.Released;
        // m.Genre = foundMovieResponse.data.Genre;
        // m.Director = foundMovieResponse.data.Director;
        const m = new MovieCreateDto(foundMovieResponse.data.Title, foundMovieResponse.data.Released,
            foundMovieResponse.data.Genre, foundMovieResponse.data.Director);

        const movie = new this.movieModel(m);

        return movie.save();
    }

    async getAllMovies(): Promise<Movie[]> {
        return await this.movieModel.find().exec();
    }
}
