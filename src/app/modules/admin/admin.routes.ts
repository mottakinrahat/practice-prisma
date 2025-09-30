import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middleWares/validateRequest";
import { AdminValidation } from "./admin.validation";
const router = express.Router();


router.get("/", AdminController.getAllAdminFromDB);
router.get("/:id", AdminController.getSingleAdmin);
router.patch(
  "/:id",
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdminData
);
router.delete("/:id", AdminController.deleteAdminData);
router.delete("/soft/:id", AdminController.softDeleteAdminData);

export const adminRoutes = router;
