import { Request, Response } from "express";
import { BreakdownNotification } from "../entity/BreakdownNotification";
import { SignalNotification } from "../entity/SignalNotification";
import { Panne } from "../entity/Panne";
import { Signal } from "../entity/Signal";

export const getNotifications = async (_req: Request, res: Response) => {
    try{
        const breakdownNotif = await BreakdownNotification.find();
        const theftNotif = await SignalNotification.find();

        let breakdowns:any[] = [];
        let thefts:any[] = [];

        let notifications = {};

        for (var i = 0; i < breakdownNotif.length; i++){
            let breakdown = await Panne.findOneOrFail({idPanne: breakdownNotif[i].idPanne});

            breakdowns[i] = Object.assign(breakdownNotif[i], breakdown);

        }

        for (var i = 0; i < theftNotif.length; i++){
            let theft = await Signal.findOneOrFail({idSignal: theftNotif[i].idSignal});

            thefts[i] = Object.assign(theftNotif[i], theft);
        }
           
        notifications = breakdowns.concat(thefts);

        return res.json(notifications);

    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};


