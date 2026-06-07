import CatModel from "../models/cat.model.ts"


export const createCatService = async (payload: object) => {
    return await CatModel.create(payload)
};

export const getAllCatsService = async () => {
    return await CatModel.find()
};

export const getSingleCatService = async (id: string) => {
    return await CatModel.findById(id)
};

export const searchCatsService = async (query: string) => {
    return await CatModel.find({
        $or: [
           {
             name: {
                $regex: query,
                $options: "i"
            },
           },
            {
             breed: {
                $regex: query,
                $options: "i"
            },
           },
        ],
    });
};


export const recommendCatService = async (kidsFriendly: boolean, apartmentFriendly: boolean) => {
    return await CatModel.find({
        kidsFriendly: kidsFriendly,
        apartmentFriendly: apartmentFriendly
    })
};