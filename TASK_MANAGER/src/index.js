import dotenv from 'dotenv';
import express  from 'express';
import { connnectDB } from './db/index.js';
import app from './app.js';



dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.get("/", (req,res)=> {
    res.send ("Task Manager is running")
});

const PORT = process.env.PORT || 5000;

const runServer = async () => {
    try {
        await connnectDB() //db is at another continent

    app.listen(PORT, () => {
    console.log(`server is running on PORT --- ${PORT}`);
    
})
    } catch (error) {
        console.log("failed to start the server", error);
        
    }
}

runServer();