import { AdminServices } from "./admin.services";

const pick = (obj: any, keys: any) => {
  const finalObj: any = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};
const getAllAdminFromDB = async (req: any, res: any) => {
  try {
    const filter = pick(req.query, ["name", "email", "searchTerm", "contactNumber"]);

    const result = await AdminServices.getAllAdmin(filter);
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
