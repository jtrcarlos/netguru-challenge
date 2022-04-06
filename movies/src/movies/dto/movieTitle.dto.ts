import {ApiProperty} from "@nestjs/swagger";

export class MovieTitleDto{
    @ApiProperty()
    title: string;
}
