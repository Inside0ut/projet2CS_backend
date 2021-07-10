import { Request, Response } from "express";
import {VehicleState} from "../entity/VehicleState";
import {Rental,rental_status_enum} from "../entity/Rental";
import {Tenant} from "../entity/Tenant";
import { User } from "../entity/User";
import { Borne } from "../entity/Borne";
import { VehiclePosition } from "../entity/VehiclePosition";
import { VehicleTracking } from "../entity/VehicleTracking";
import { Vehicle } from "../entity/Vehicle";


export const get =  (_req: Request, res: Response) => {
    res.end("Hello there this is my new service.");
}
//CREATE
export const createVehicleState = async (req: Request, res: Response) => {
    try{
    const vehicle_state = VehicleState.create({
        idRental:req.body.idRental,
        idBorne :req.body.idBorne,
        kilos:req.body.kilos,
        engineTemp :req.body.engineTemp,
        fuelLevel :req.body.fuelLevel,
        oilPressure :req.body.oilPressure,
        batteryCharge :req.body.batteryCharge,
        brakeFuild :req.body.breakFuild,
        vidange :req.body.vidange

    })

    await vehicle_state.save()
    res.send(vehicle_state)
    return res.status(200).json(vehicle_state)
}catch(err){
    console.error()
    return res.status(500).json(err)
}
}



//READ (return all VehicleStates)
export async function getVehicleState(_req: Request, res: Response) {
    const vehicle_state = await VehicleState.find();
    return res.json(vehicle_state)
}




//UPDATE
export async function updateVehicleState(req: Request, res: Response) {
    const id= Number(req.params.idVehicle)
    try {
       // const vehicle_state = await VehicleState.findOneOrFail(id)
        const rental= await Rental.findOneOrFail({idVehicle:id,rentalstate:"active"})
        const vehicle_state=await VehicleState.findOneOrFail({idRental:rental.idRental})
        vehicle_state.idRental=req.body.idRental||vehicle_state.idRental,
        vehicle_state.idBorne =req.body.idBorne||vehicle_state.idBorne,
        vehicle_state.kilos=req.body.kilos || vehicle_state.kilos,
        vehicle_state.engineTemp =req.body.engineTemp || vehicle_state.engineTemp,
        vehicle_state.fuelLevel =req.body.fuelLevel || vehicle_state.fuelLevel,
        vehicle_state.oilPressure =req.body.oilLevel || vehicle_state.oilPressure,
        vehicle_state.batteryCharge =req.body.batteryCharge || vehicle_state.batteryCharge,
        vehicle_state.brakeFuild =req.body.breakFuild || vehicle_state.brakeFuild
        vehicle_state.vidange =req.body.vidange || vehicle_state.vidange


        await vehicle_state.save()
        return res.json(vehicle_state)
    } catch (error) {
        console.error()
        return res.status(500).json(error)
    }
    
}



//DELETE
export async function deleteVehicleState(req: Request, res: Response) {
    const id= req.params.id_state
    try {
        const vehicle_state = await VehicleState.findOneOrFail(id)
    
        await vehicle_state.remove()
        return res.json(
            {
                message:"vehicle state deleted successful"
            })
    } catch (error) {
        console.error()
        return res.status(500).json({error:"Something went wrong "})
    }
    
}




//FIND
export async function findVehicleState(req: Request, res: Response) {
    const id= Number(req.query.idVehicle)
    try {
         //return rental active of a vehicle if exist 
         const rental= await Rental.findOneOrFail({idVehicle:id,rentalstate:"active"})
         const vehicle_state=await VehicleState.findOneOrFail({idRental:rental.idRental})

        return res.json(vehicle_state)
    } catch (error) {
        console.error()
        return res.status(500).json(error)
    }
}

export async function findVehicleRental(req: Request, res: Response) {
    const id= Number(req.query.idVehicle)
    var resultat={}
    try {
        //return rental active of a vehicle if exist 
        const rental= await Rental.findOneOrFail({idVehicle:id,rentalstate:"active"})
        //return tenant of vehicle 
        const tenant=await Tenant.findOneOrFail(rental.idTenant)
        const user=await User.findOneOrFail(tenant.idUser)
        const borne= await Borne.findOneOrFail(rental.iddepartborne)
        resultat=Object.assign(user,rental, borne)
        return res.status(200).json(resultat)
    } catch (error) {
        console.error()
        return res.status(500).json(error)
    }
} 

export async function updateVehiclePosition(req: Request, res: Response) {
    const id= Number(req.query.idRental)
    try {
        //get position from idRental
        const position= await VehiclePosition.findOneOrFail({idRental:id})
        //get Vehicle tracking
        const tracking=await VehicleTracking.find({idPosition:position.idPosition  }&&{ 
            order: {
                created_at:'DESC'
               
            }
            })
        //get vehicle
        const rental=await Rental.findOneOrFail({idRental:id})
        const vehicle=await Vehicle.findOneOrFail({idVehicle:rental.idVehicle})
        vehicle.latitude=tracking[0].latitude
        vehicle.longitude=tracking[0].longitude
        vehicle.save()
        return res.status(200).json({message :"position is uptaded"})
    } catch (error) {
        console.error()
        return res.status(500).json(error)
    }
} 