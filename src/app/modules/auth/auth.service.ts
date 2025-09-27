import generateToken from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { TLogInUser } from "./auth.interface";
import bcrypt from "bcrypt";







const loginUser = async (payload: TLogInUser) => {
  const { email, password } = payload;

  // Find the user by email
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
    },
  });

  // Validate password
  const isCorrectPassword = await bcrypt.compare(password, userData?.password);
  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }

  // Create JWT token
  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    "15m"
  );
const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefgh",
    "30d"
  );

  // Fixed logging

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  console.log("Refresh token called", token);
}

export const authServices = {
  loginUser,
  refreshToken
}