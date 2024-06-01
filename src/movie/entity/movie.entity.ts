import { Genre } from "src/genre/entity/genre.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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