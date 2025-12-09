import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async() => {
    try{

        const {MONGO_DB_URL} = ENV;
        if(!MONGO_DB_URL) throw  new Error("MONGO_DB_URL is not set");

        const conn = await mongoose.connect(MONGO_DB_URL);
        console.log(`Monogo DB connected Successfully ✅ to ${conn.connection.host}`);
    }catch(error){
        console.error("Monogo DB connection error ❌");
        console.error(error);
        process.exit(1); 
    }
}