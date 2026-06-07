import mongoose from "mongoose"


export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("mongoDb connected")
    } catch (error) {
        console.log("error in mongoDb", error)
    }
}

