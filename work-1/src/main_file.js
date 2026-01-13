import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.router.js";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARES ---------------- */

// parse JSON bodies
app.use(express.json());

// parse form data (needed for multer text fields)
app.use(express.urlencoded({ extended: true }));

// request logger (DEBUGGING — DO NOT REMOVE)
app.use((req, res, next) => {
  console.log("HIT:", req.method, req.url);
  next();
});

/* ---------------- ROUTES ---------------- */

app.use("/users", userRouter);

// test route (sanity check)
app.get("/", (req, res) => {
  res.send("Server running");
});

/* ---------------- SERVER + DB ---------------- */

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
