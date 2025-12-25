import { app  } from "./app.js";

console.log("ENV CHECK:", process.env.MONGODB_URL);


import connectdb from "./DB/index.js"


connectdb()

.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is runing at port : ${process.env.PORT}`);
        
    })
} )
.catch((err) => {
    console.log("MONGO DB CONNECTIONN FAILED" , err );
    
})

