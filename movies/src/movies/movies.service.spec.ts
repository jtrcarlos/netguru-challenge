import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import {HttpService} from "@nestjs/axios";
import {Model} from "mongoose"
import {Movie, MovieDocument} from "./movie.schema";

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService, HttpService]
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
