import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
    @Prop()
    Title: string;

    @Prop()
    Released: Date;

    @Prop()
    Genre: string;

    @Prop()
    Director: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);