
export class MovieCreateDto{
    Title: string;
    Released: Date;
    Genre: string;
    Director: string;

    constructor(Title: string, Released: Date, Genre: string, Director: string) {
        this.Title = Title;
        this.Released = Released;
        this.Genre = Genre;
        this.Director = Director;
    }
}