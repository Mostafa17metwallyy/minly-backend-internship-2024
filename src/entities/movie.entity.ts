import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, Timestamp } from "typeorm";
import { Directors } from "./director.entity";
import { Festival } from "./festival.entity";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    releaseDate:string;

    @Column('decimal',{precision: 3, scale: 2, default: 0})
    rating:number;

    @Column({nullable:true})
    moviePoster:string| null

    @Column({nullable:true})
    trailer:string | null

    @Column({ type: 'timestamp', nullable: true })
    createdAt: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date | null;

    @PrimaryGeneratedColumn("uuid")
    uuId: string;

    @ManyToOne(() => Directors, (director) => director.movies)
    director: Directors;
    actors: any;

    @Column()
    actorId:number;
    @Column()
    directorId:number;

    @Column()
    festivalId:number
        



}


 
