import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()
try {
    mongoose.connect(process.env.mongoUrl)
    const connection = mongoose.connection
    connection.on('connected', () => {
        console.log("connected")
    })
    connection.on('error', () => {
        console.error("db connection error")
    })
} catch (error) {
    console.log(error);
}
export default mongoose;