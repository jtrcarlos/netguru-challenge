import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {ApiProperty} from "@nestjs/swagger";


export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
    @ApiProperty()
    @Prop()
    Title: string;

    @ApiProperty({type: Date})
    @Prop()
    Released: Date;

    @ApiProperty()
    @Prop()
    Genre: string;

    @ApiProperty()
    @Prop()
    Director: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);