import express from "express";
import {
  signUp,
  logIn,
  logOut,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const authRouter = express.Router();

authRouter.use(arcjetProtection)

authRouter.post("/signUp", signUp);
authRouter.post("/logIn", logIn);
authRouter.get("/logOut", logOut);
authRouter.put("/updateProfile", protectRoute, updateProfile);

authRouter.get("/check" , protectRoute , (req,res) => res.status(200).json(req.user));
export default authRouter;
