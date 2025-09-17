import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { AdminServices } from "./admin.services";

const getAllAdminFromDB = async (req: any, res: any) => {
  try {
    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await AdminServices.getAllAdmin(filter, options);
    res.status(200).json({
      success: true,
      message: "Admin data retrieved successfully",
      meta: result?.meta,
      data: result?.data,
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
const getSingleAdmin = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(id);
    res.status(200).json({
      success: true,
      message: "Single data retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving admin data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to Single retrieve admin data",
      error: error || "Internal Server Error",
    });
  }
};
const updateAdminData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.updateAdminDataFromDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "admin data updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving admin data:", error);
    res.status(500).json({
      success: false,
      message: "failed to update admin data",
      error: error || "Internal Server Error",
    });
  }
};
const deleteAdminData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.deleteAdminFromDB(id);
    res.status(200).json({
      success: true,
      message: "admin data deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error deleting admin data:", error);
    res.status(500).json({
      success: false,
      message: "failed to delete admin data",
      error: error || "Internal Server Error",
    });
  }
};
const softDeleteAdminData = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    console.log(id)
    const result = await AdminServices.softDeleteAdminFromDB(id);
    res.status(200).json({
      success: true,
      message: "admin data softly deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error deleting admin softly data:", error);
    res.status(500).json({
      success: false,
      message: "failed to delete admin data",
      error: error || "Internal Server Error",
    });
  }
};
export const AdminController = {
  getAllAdminFromDB,
  getSingleAdmin,
  updateAdminData,
  deleteAdminData,
  softDeleteAdminData,
};
