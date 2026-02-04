
import generateToken, { verifyToken } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { TLogInUser } from "./auth.interface";
import bcrypt from "bcrypt";
import { UserStatus } from "../../../../generated/prisma";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

const loginUser = async (payload: TLogInUser) => {
  const { email, password } = payload;

  // Find the user by email
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
      status: UserStatus.ACTIVE
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
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  // Fixed logging

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {

  let decodedData;
  try {
    decodedData = await verifyToken(token, config.jwt.refresh_token_secret as Secret);
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new Error("You are not authorized ");
  }
  if (typeof decodedData !== "object" || !decodedData || !("email" in decodedData)) {
    throw new Error("Invalid token payload");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE
    },
  });
   const accessToken = generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    process.env.jwt_secret as Secret,
    process.env.expires_in as string
  );
   return {
    accessToken,
    needPasswordChange: userData?.needPasswordChange,
  };
};

export const authServices = {
  loginUser,
  refreshToken,
};
