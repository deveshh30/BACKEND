// // require('dotenv').config({path: "./env"}) 
// // this line start all env variable as soon as file opens

import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();

await connectDB()


// .catch((error)=> {
//   console.log("monngo db connection fail", error);
  
// })
// .then(()=>{
//   app.listen(process.env.PORT, ()=> {
//     console.log(`server is running devesh at port : ${process.env.PORT}`);
    
//   })
// })

// app.get("/", (req, res) => {
//   res.send("Server running");
// });

// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Server listening on port ${process.env.PORT || 3000}`);
// });

dotenv.config({
    path: './env'
})


// // ( async () => {
// //     try {
// //         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
// //         app.on("error", (error) => {
// //             console.log("ERROR", error);
// //             throw error
            
// //         })

// //         app.listen(process.env.PORT , () => {
// //             console.log(`app is listening on port ${process.env.PORT}`);
            
// //         })
// //     } catch (error) {
// //         console.error("ERROR", error)
// //         throw error
// //     }
// // })()



