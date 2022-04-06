import {Module} from '@nestjs/common';
import {MoviesController} from "./movies.controller";
import {MoviesService} from "./movies.service";
import {HttpModule} from "@nestjs/axios";
import {MongooseModule} from "@nestjs/mongoose";
import {Movie, MovieSchema} from "./movie.schema";
import {UserLimit, UserLimitSchema} from "../user/userLimit.shema";
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers: [MoviesController],
    providers: [MoviesService],
    imports: [AuthModule, HttpModule,
        MongooseModule.forFeature([{name: Movie.name, schema: MovieSchema}]),
        MongooseModule.forFeature([{name: UserLimit.name, schema: UserLimitSchema}])],
})
export class MoviesModule {
}
