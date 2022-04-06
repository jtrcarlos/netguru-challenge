import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { MoviesModule } from './movies/movies.module';
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI),
        MoviesModule,
        AuthModule
    ]
})
export class AppModule {
}
