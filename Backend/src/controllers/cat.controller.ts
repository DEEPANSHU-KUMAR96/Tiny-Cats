import type { Request, Response } from "express";
import { createCatService, getAllCatsService, getSingleCatService, recommendCatService, searchCatsService } from "../services/cat.service.ts";


export const createCatController = async (req: Request, res: Response) => {
    const result = await createCatService(req.body)

    return res.status(201).json({
        success: true,
        message: "Cat created",
        data: result,
    })
}

export const getAllCatsController = async (req: Request, res: Response) => {
    const result = await getAllCatsService()

    return res.status(200).json({
        success: true,
        message: "get All cats succesfully",
        data: result,
    })
}

export const getSingleCatController = async (req: Request, res: Response) => {

    let id = req.params.id as string;

    const result = await getSingleCatService(id);

    return res.status(200).json({
        success: true,
        message: "get single cat succesfully",
        data: result,
    })
}


export const searchCatController = async (req: Request, res: Response) => {

    let q = req.query.q as string;

    const result = await searchCatsService(q)

    return res.status(200).json({
        success: true,
        message: "search cat succesfully",
        data: result,
    })
}


export const recommendCatController = async (req: Request, res: Response) => {

    const { kidsFriendly, apartmentFriendly } = req.body
    const result = await recommendCatService(kidsFriendly, apartmentFriendly)

    return res.status(200).json({
        success: true,
        message: "cat recommanded succesfully",
        data: result,
    })
}