import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { AdminServices } from "./admin.services";


const getAllAdminFromDB = async (req: any, res: any) => {
  try {
    const filter = pick(req.query,adminFilterableFields);
    const options=pick(req.query,["page","limit","sortBy","sortOrder"])
    const result = await AdminServices.getAllAdmin(filter,options);
    res.status(200).json({
      success: true,
      message: "Admin data retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving admin data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin data",
      error: error || "Internal Server Error",
    });
  }
};

export const AdminController = {
  getAllAdminFromDB,
};
