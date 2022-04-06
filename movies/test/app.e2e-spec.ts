import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {MoviesService} from "../src/movies/movies.service";

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let movieService = { getMovies: ()=> ["test"]};

  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    })
        .overrideProvider(MoviesService)
        .useValue(movieService)
        .compile()

    app = moduleRef.createNestApplication();
    await app.init();
  })

  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();
  //
  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  it('/movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect({
        data: movieService.getMovies()
      });
  });

  afterAll(async ()=>{
    await app.close();
  })
});
