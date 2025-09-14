import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.routes";
import { adminRoutes } from "./app/modules/admin/admin.routes";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});

app.use('/api/v1',userRoutes)
app.use('/api/v1',adminRoutes)
export default app;