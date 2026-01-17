import dotenv from 'dotenv';
import express  from 'express';

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req,res)=> {
    res.send ("Task Manager is running")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on PORT --- ${PORT}`);
    
})