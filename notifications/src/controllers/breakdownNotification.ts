import { Request, Response } from "express";
import { BreakdownNotification } from "../entity/BreakdownNotification";
import { Panne } from "../entity/Panne";

export const addBreakdown = async  (req: Request, res: Response) => {
    const { read, idPanne } = req.body;
    try{
        const breakdownNotif = BreakdownNotification.create({
            read: read || false,
            idPanne
        });
  
        await breakdownNotif.save();
        return res.send(breakdownNotif);

    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

export const getBreakdown = async (_req: Request, res: Response) => {
    try{
        const breakdownNotif = await BreakdownNotification.find();

        let breakdowns:any[] = [];

        for (var i = 0; i < breakdownNotif.length; i++){

            let breakdown = await Panne.findOneOrFail({idPanne: breakdownNotif[i].idPanne});

            breakdowns[i] = Object.assign(breakdownNotif[i], breakdown);

        }
           

        return res.json(breakdowns);

    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

export const readBreakdown = async (req: Request, res: Response) => {
    try{
        const breakdownNotifID = req.params.id;
        const breakdownNotif = await BreakdownNotification.findOneOrFail({
            id : Number(breakdownNotifID),
        });

        // set notification as read
        breakdownNotif.read = true;

        // save notification
        await breakdownNotif.save();

        return res.json(breakdownNotif);

    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}


export const deleteBreakdown =  async (req: Request, res: Response) => {
    try{
        const breakdownNotifID = req.params.id;
        const breakdownNotif = await BreakdownNotification.findOneOrFail({
            id : Number(breakdownNotifID),
        });

        await breakdownNotif.remove();

        return res.json({
            message : 'Notification deleted'
        });
        
    } catch(err){
        console.log(err);
        return res.status(500).json(err)
    };
}
