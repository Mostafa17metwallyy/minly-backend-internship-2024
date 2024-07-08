import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Movie } from "./movie.entity";

export class Festival{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string

    @Column()
    date:Date

    @PrimaryGeneratedColumn("uuid")
    uuId: string;

    // @ManyToMany(() => Movie, (movie) => movie.festivals)
    // movies: Movie[];
}

