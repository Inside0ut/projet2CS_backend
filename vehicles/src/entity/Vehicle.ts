import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Vehicle")
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn()
    idVehicle: number;

    @Column()
    vehicleType: string;

    @Column()
    vehiclemodel: string;

    @Column()
    vehiclebrand: string;

    @Column()
    image: string;

    @Column()
    vehicleColor:string;

    @Column()
    registrationNumber:string;

    @Column()
    availibility:string;

    @Column()
    unitPricePerHour:number;

    @Column()
    unitPricePerDay:number;

    @Column()
    idBorne:number;

    @Column()
    fuelType:string;

    @Column()
    longitude:number;

    @Column()
    latitude:number;

    @Column()
    chassisNumber:string;

    @Column()
    speed:number;

    @Column()
    numberOfPlaces:number;
    
    
}
