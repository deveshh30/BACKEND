import dotenv from "dotenv";
import { app } from "./app";
import {connectDB} from "./db/db.js"


dotenv.config({path : "./.env"})

const PORT = process.env.PORT || 8000;

const runServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, ()=> {
            console.log(`server  is running at port : ${PORT}`);
            
        })
    } catch (error) {
        console.log("failed to start the server", error);
    }
}

runServer();