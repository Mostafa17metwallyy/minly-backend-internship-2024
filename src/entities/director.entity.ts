import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Movie } from "./movie.entity";
import { Gender } from "src/enum";

@Entity()
export class Directors{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column()
    birthDate:string

    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.MALE,
      })
      gender: Gender;
      

    @Column()
    nationality:string

    @Column()
    bio:string

    @Column({nullable:true})
    numberOfAwards:number

    @Column({nullable:true})
    @Column()
    picture:string

    @Column({ type: 'timestamp', nullable: true })
    createdAt: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    @Column({ type: 'timestamp'})
    updatedAt: Date | null;

    @Column({ nullable: true })
    uuId: string;


    @OneToMany(() => Movie, (movie) => movie.director)
    movies: Movie[];
}

