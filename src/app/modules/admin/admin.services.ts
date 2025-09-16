
import { Prisma, PrismaClient } from "../../../../generated/prisma";
import { calculatePagination } from "../../../helpers/paginationHelpers";
import prisma from "../../../shared/prisma";
import { adminSearchableFields } from "./admin.constant";



const getAllAdmin = async (params: any, options: any) => {
  const { page, limit, sortBy, sortOrder,skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive", // for case-insensitive search
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  // Apply the filter with the search term
  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }; // Ensure consistent type
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take:limit,
    orderBy: sortBy && sortOrder
      ? [{ [sortBy]: sortOrder }]
      : [{ name: "asc" }], // Fallback to 'name' for sorting if not provided
  });

  return result;
};

export const AdminServices = {
  getAllAdmin,
};
