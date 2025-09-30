import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middleWares/auth";


const router = express.Router();



router.post("/", auth("ADMIN", "SUPER_ADMIN"), UserController.createAdminUser);
router.get("/", UserController.createAdminUser);
export const userRoutes = router;
