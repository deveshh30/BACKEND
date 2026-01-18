import dotenv from 'dotenv';
import { connnectDB } from './db/index.js';
import app from './app.js';



dotenv.config({ path: "./.env" });



const PORT = process.env.PORT || 5000;

const runServer = async () => {
    try {
        await connnectDB() // index.js wali file run karte hi hmara db bhi connect karjaye or run hojae

    app.listen(PORT, () => {
    console.log(`server is running on PORT --- ${PORT}`);
    
})
    } catch (error) {
        console.log("failed to start the server", error);
        
    }
}

runServer();