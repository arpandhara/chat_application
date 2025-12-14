import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRoute);

const PORT = ENV.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running at port : ${PORT}`);
  });
})
