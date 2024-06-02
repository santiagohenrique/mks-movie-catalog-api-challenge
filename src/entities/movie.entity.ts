import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "./genre.entity";

@Entity({name: 'movies'})
export class Movie{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: "varchar"})
    title: string

    @Column({type: "varchar"})
    synopsis: string

    @ManyToOne(() => Genre, genre => genre.movies)
    @JoinColumn({ name: 'genre_id' })
    genre: Genre

    @Column({type: "integer"})
    year: number

    @Column({type: "float"})
    score: number

}