import jwt from "jsonwebtoken";
const generateToken = (payload: any, secret: jwt.Secret, expiresIn: string) => {
  const token = jwt.sign(
    payload,
    secret,
    {
      expiresIn: expiresIn,
      algorithm: "HS256",
    } as jwt.SignOptions
  );
  return token;
}
export default generateToken;