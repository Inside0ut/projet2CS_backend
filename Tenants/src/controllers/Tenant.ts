import { Request, Response } from "express";
import {Tenant} from "../entity/Tenant";
import {User} from "../entity/User" ;
 
export async function getTenants(_req:Request, res:Response){ //outputs : idUser
    const Tenants =await Tenant.find(); 
    const len=Tenants.length;
    let  user = new Array();
    for (let i = 0; i < len ; i++) {
            console.log(Tenants[0].idUser)
            user[i] = await User.find({
            where : {idUser : Tenants[0].idUser}
        });
      }
  res.json(user)
}

export async function banTenantAccount(req:Request, res:Response){ //outputs : idUser
  const id=Number(req.query.idUser)
  try{
  const tenant =await Tenant.findOneOrFail({idUser:id}); 
  tenant.accountState="banned"
  tenant.save()
  res.status(200).json({message:"Account successfuly updated"})
  }catch(err){
    res.status(500)
  }
}