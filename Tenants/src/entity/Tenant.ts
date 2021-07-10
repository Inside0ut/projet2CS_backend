import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Tenant")
export class Tenant extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTenant: number;

    @Column()
    idUser: number;

    @Column()
    refPermit: string;

    @Column()
    accountState: string;

    @Column()
    profilePicture: string;

    @Column()
    selfie: string;

    @Column()
    subCard: number;

    @Column()
    points: number;

    @Column()
    stateMessage: string;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @Column()
    dateSignUp:string;

    @Column()
    validationDate: Date;

}
