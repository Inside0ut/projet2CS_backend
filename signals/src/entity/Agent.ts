import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp} from "typeorm";


@Entity("Agent")
export class Agent extends BaseEntity {

    @PrimaryGeneratedColumn()
    idAgent: number;

    @Column()
    idUser:number;

    @Column()
    nom:String;

    @Column()
    prenom:String;

    @Column()
    adresse:String;

    @Column()
    personalPhoto:String;

}
