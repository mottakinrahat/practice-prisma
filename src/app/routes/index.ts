import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
const router = express.Router();

const moduleRouter = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admins",
    route: adminRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
