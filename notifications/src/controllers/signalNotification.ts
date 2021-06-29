import { Request, Response } from "express";
import { SignalNotification } from "../entity/SignalNotification";
import { Signal } from "../entity/Signal";

export const addSignal = async  (req: Request, res: Response) => {
    const { read, idSignal } = req.body;
    try{
        const signalNotif = SignalNotification.create({
            read: read || false,
            idSignal
        });
  
        await signalNotif.save();
        return res.send(signalNotif);

    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

export const getSignal = async (_req: Request, res: Response) => {
    try{
        const signalNotif = await SignalNotification.find();

        let theftSignals:any[] = [];

        for (var i = 0; i < signalNotif.length; i++){

            let theft = await Signal.findOneOrFail({idSignal: signalNotif[i].idSignal});

            theftSignals[i] = Object.assign(signalNotif[i], theft);
        }

        
        return res.json(theftSignals);

    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

export const readSignal = async (req: Request, res: Response) => {
    try{
        const signalNotifID = req.params.id;
        const signalNotif = await SignalNotification.findOneOrFail({
            id : Number(signalNotifID),
        });

        // set notification as read
        signalNotif.read = true;

        // save notification
        await signalNotif.save();

        return res.json(signalNotif);

    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}


export const deleteSignal =  async (req: Request, res: Response) => {
    try{
        const signalNotifID = req.params.id;
        const signalNotif = await SignalNotification.findOneOrFail({
            id : Number(signalNotifID),
        });

        await signalNotif.remove();

        return res.json({
            message : 'Notification deleted'
        });
        
    } catch(err){
        console.log(err);
        return res.status(500).json(err)
    };
}
