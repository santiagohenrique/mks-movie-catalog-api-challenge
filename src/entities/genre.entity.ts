import { Movie } from 'src/entities/movie.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'genres' })
export class Genre {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => Movie, movie => movie.genre)
    movies: Movie[];
}