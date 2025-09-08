import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createAdminUser = async (req:Request,res:Response) => {
try {
    const result = await UserServices.createAdmin(req.body);
    res.status(200).json({
        success: true,
        message: "Admin user created successfully",
        data: result
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to create admin user",
        error: error
    });
}
};

export const UserController = {
  createAdminUser
};
