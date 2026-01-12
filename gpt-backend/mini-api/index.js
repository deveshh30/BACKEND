import express from 'express';
import connectDB from './db/connect_db.js';
import userRoutes from './routes/user.routes.js';


const app = express()
const PORT = 4000

app.use(express.json());


connectDB(); // start the server


app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});