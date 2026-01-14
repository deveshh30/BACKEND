import "./config/env.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // MUST be first

import connectDB from "./db/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
