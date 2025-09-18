import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import { z, ZodObject } from "zod";
const router = express.Router();
const update = z.object({
  body: z.object({
    name: z.string(),
    contactNumber: z.string(),
  }),
});
const validateRequest =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req?.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
router.get("/admins", AdminController.getAllAdminFromDB);
router.get("/admins/:id", AdminController.getSingleAdmin);
router.patch(
  "/admins/:id",
  validateRequest(update),
  AdminController.updateAdminData
);
router.delete("/admins/:id", AdminController.deleteAdminData);
router.delete("/admins/soft/:id", AdminController.softDeleteAdminData);

export const adminRoutes = router;
