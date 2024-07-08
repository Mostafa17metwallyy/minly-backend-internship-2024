import { Timestamp } from "typeorm";

export class CreateMovieDto {
    id:number
    title: string
    releaseDate:string;
    rating:number;
    moviePoster:string |null;
    directorId: number;
    createdAt:Date  |null;
    updatedAt:Date |null;;
    trailer:string |null ;
    uuId: string;
    actorId:number
    directorsId:number
    //festivalId:number
}