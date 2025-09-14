import { AdminServices } from "./admin.services";


const getAllAdminFromDB = async (req: any, res: any) => {

  const result = await AdminServices.getAllAdmin(req?.query);
  res.status(200).json({
    success: true,
    message: "Admin data retrieved successfully",
    data: result
  });
};

export const AdminController = {
  getAllAdminFromDB,
};