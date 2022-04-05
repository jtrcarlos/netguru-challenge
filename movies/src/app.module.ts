import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt"
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MoviesController} from './movies/movies.controller';
import {MoviesService} from './movies/movies.service';
import {HttpModule} from "@nestjs/axios";
import {MongooseModule} from "@nestjs/mongoose";
import {Movie, MovieSchema} from "./movies/movie.schema";
import {UserLimit, UserLimitSchema} from "./user/userLimit.shema";

@Module({
    imports: [HttpModule,
        JwtModule.register({secret: "secret"}),
        MongooseModule.forRoot(process.env.MONGO_URI),
        MongooseModule.forFeature([
            {name: Movie.name, schema: MovieSchema},
            {name: UserLimit.name, schema: UserLimitSchema}
        ]),
    ],
    controllers: [AppController, MoviesController],
    providers: [AppService, MoviesService],
})
export class AppModule {
}
