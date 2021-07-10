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
export async function getTenantsInfo(_req:Request, res:Response){ //outputs : idUser
  try{
    var i=0;
    var j=0;
    var m=0;
    var result=[]
    var pending=[]
  const tenant =await Tenant.find(); 
  for(i=0;i<tenant.length;i++){
    const user =await User.findOneOrFail({idUser:tenant[i].idUser});
    if(tenant[i].accountState=="pending"){
    pending[j]=Object.assign(tenant[i],user)
    j++
    }
    else {
    result[m]=Object.assign(tenant[i],user)
    m++
    }
  }
  result.sort((a, b) => (a.accountState > b.accountState) ? 1 : -1)
  //const list=Object.assign(pending,result)
  res.status(200).json(pending.concat(result))
  }catch(err){
    res.status(500)
  }
}