import { Request, Response } from "express";
import {User} from "../entity/Users";

export const get =  (_req: Request, res: Response) => {
    res.end("Hello there this is my new service.");
}

export const addUser = async (req: Request, res: Response) => {
    const user = User.create({
        firstName: req.body.first,
        lastName: req.body.last
    })

    await user.save()
    res.send(user)
}

export async function getUsers(_req: Request, res: Response) {
    const users = await User.find();
    res.json(users)
}