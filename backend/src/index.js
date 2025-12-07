import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth" , authRouter);
app.use("/api/messages" , messageRoute);

const PORT = process.env.PORT || 3000

app.listen(PORT , () => {
    console.log(`App is running at port : ${PORT}`)
})

