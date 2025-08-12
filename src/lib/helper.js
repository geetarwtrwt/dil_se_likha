import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export let validateToken = async () => {
  try {
    let token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("No token provided");

    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return { userId: decodedToken.id };
  } catch (err) {
    throw new Error("Not a authorized user");
  }
};
