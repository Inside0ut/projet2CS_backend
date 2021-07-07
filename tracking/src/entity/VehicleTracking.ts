import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Timestamp} from "typeorm";


@Entity("VehicleTracking")
export class VehicleTracking extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTrack: number;

    @Column()
    idPosition:number;

    @Column()
    latitude:number;

    @Column()
    longitude:number;

    @Column()
    created_at:Date;

}
