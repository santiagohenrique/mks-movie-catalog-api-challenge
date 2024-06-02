import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: "varchar"})
    fullName: string

    @Column({type: "varchar"})
    username: string

    @Column({type: "varchar"})
    password: string

}