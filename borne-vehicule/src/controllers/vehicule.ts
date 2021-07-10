import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { getConnection } from "typeorm";

import { Vehicle } from "../entity/Vehicle";

export const getVehicule = (req: Request, res: Response) => {
  Vehicle.findOne({ idVehicle: parseInt(req.params.idVehicule) })
    .then((vehicule: any) => {
      res.status(200).send(vehicule);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message,
      });
    });
};

export const getVehiculesByBorneId = async (req: Request, res: Response) => {
  try {
    const vehicles = await getConnection()
      .createQueryBuilder()
      .select("Vehicle")
      .from(Vehicle, "Vehicle")
      .where("Vehicle.idBorne = :id", { id: parseInt(req.params.idBorne) })
      .getMany();
      
    res.status(200).send(vehicles);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


export async function addVehicule(req: Request, res: Response) {
  const vehicule = Vehicle.create({
    registrationNumber: req.body.registrationNumber,
    chassisNumber:req.body.chassisNumber,
    unitPricePerHour: req.body.unitPricePerHour,
    unitPricePerDay: req.body.unitPricePerDay,
    vehicleType: req.body.vehicleType,
    vehiclebrand: req.body.vehiclebrand,
    vehiclemodel: req.body.vehiclemodel,
    fuelType: req.body.fuelType,
    idBorne: req.body.idBorne,
    vehicleColor: req.body.vehicleColor,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    availibility:req.body.availibility
  })

  vehicule
    .save()
    .then(() => {
      res.status(200).send(vehicule);
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
}

export async function getVehicules(_req: Request, res: Response) {
  Vehicle.find()
    .then((vehicles) => {
      res.status(200).json(vehicles);
    })
    .catch((e) => {
      console.log(e)
      res.status(500).json({ message: e.message });
    });
}

export const updateVehicule = async (req: Request, res: Response) => {
  if (
    !req.body.registrationNumber ||
    !req.body.unitPricePerHour ||
    !req.body.unitPricePerDay ||
    !req.body.vehicleType ||
    !req.body.vehiclebrand ||
    !req.body.vehiclemodel ||
    !req.body.fuelType ||
    !req.body.idBorne ||
    !req.body.vehicleColor ||
    !req.body.longitude ||
    !req.body.latitude
  ) {
    return res.status(400).send({
      message: "Champs Vides",
    });
  }

  Vehicle.update(
    { idVehicle: parseInt(req.params.idVehicule) },
    {
      registrationNumber: req.body.registrationNumber,
      unitPricePerHour: req.body.unitPricePerHour,
      unitPricePerDay: req.body.unitPricePerDay,
      vehicleType: req.body.vehicleType,
      vehiclebrand: req.body.vehiclebrand,
      vehiclemodel: req.body.vehiclemodel,
      fuelType: req.body.fuelType,
      idBorne: req.body.idBorne,
      vehicleColor: req.body.vehicleColor,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    }
  )
    .then((vehicule: any) => {
      return res.status(200).send(vehicule);
    })
    .catch((err: { kind: string }) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Vehicule non trouvé",
        });
      }

      return res.status(500).send({
        message: "Erreur Serveur",
      });
    });

  return null;
};

export const deleteVehicule = async (req: Request, res: Response) => {
  Vehicle.delete({ idVehicle: parseInt(req.params.idVehicule) })
    .then(() => {
      return res
        .status(200)
        .send({ message: "Vehicule supprimée avec succés!" });
    })
    .catch((err: { kind: string; name: string }) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Vehicule non trouvé",
        });
      }
      return res.status(500).send({
        message: "Erreur Serveur",
      });
    });
};
