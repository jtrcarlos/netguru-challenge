import {Test, TestingModule} from '@nestjs/testing';
import {MoviesController} from './movies.controller';
import {MoviesService} from "./movies.service";
import {Movie, MovieDocument} from "./movie.schema";
import {getModelToken} from "@nestjs/mongoose";
import {HttpModule, HttpService} from "@nestjs/axios";
import {Model} from "mongoose";
import {JwtModule, JwtService} from "@nestjs/jwt";

describe('MoviesController', () => {
    let controller: MoviesController;
    let service: MoviesService;
    const createdMovie = {
        Title: "Spider Man",
        Released: new Date(),
        Genre: "comedy",
        Director: "Sam Raimi"
    }
    const movie = {
        Title: "Spider Man",
        Released: new Date(),
        Genre: "comedy",
        Director: "Sam Raimi"
    }


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MoviesController],
            imports: [HttpModule, JwtModule],
            providers: [MoviesService, {
                provide: MoviesService,
                useValue: {
                    getMovies: jest.fn().mockResolvedValue([
                        {
                            Title: "Spider Man",
                            Released: new Date(),
                            Genre: "comedy",
                            Director: "Sam Raimi"
                        }
                    ]),
                    addMovie: jest.fn().mockResolvedValue(createdMovie)
                }
            }]
        }).compile();

        controller = module.get<MoviesController>(MoviesController);
        service = module.get<MoviesService>(MoviesService);
    });

    describe('getMovies', () => {
        it('should get all movies', () => {
            expect(controller.getMovies()).resolves.toEqual([
                {
                    Title: "Spider Man",
                    Released: new Date(),
                    Genre: "comedy",
                    Director: "Sam Raimi"
                }
            ]);
            expect(service.getAllMovies).toHaveBeenCalled();
        });
    });

    // describe('create movie', () => {
    //     it('should create a new movie', async () => {
    //         const createSpy = jest.spyOn(service, 'addMovie')
    //             .mockReturnValueOnce(movie);
    //         await controller.createMovie(request, movie);
    //         expect(createSpy).toHaveBeenCalled(createdMovie)
    //
    //     });
    // })
});
