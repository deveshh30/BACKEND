import express from "express"

const app = express();
app.use(express.json());

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    
} );