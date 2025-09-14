import { Prisma, PrismaClient } from "../../../../generated/prisma";


const prisma = new PrismaClient();

const getAllAdmin = async (params: any) => {
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = []; // Declare only once
  // {
  //   name: {
  //     contains: params?.searchTerm,
  //     mode: "insensitive", // for case-insensitive search
  //   },
  // },
  // {
  //   email: {
  //     contains: params?.searchTerm,
  //     mode: "insensitive", // for case-insensitive search
  //   },
  // },
  const adminSearchableFields = ["name", "email"];
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
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: filterData[key]
        }
      }))
    });
  }

  // Apply the filter with the search term
  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }; // Ensure consistent type
  const result = await prisma.admin.findMany({
    where: whereConditions,
  });

  return result;
};

export const AdminServices = {
  getAllAdmin,
};
