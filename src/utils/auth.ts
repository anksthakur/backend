import jwt from "jsonwebtoken";
import conf from "../config/conf";

export async function checkAccessToken(accessToken: string) {
  try {
    var r: any = await jwt.verify(accessToken, conf.secret);
    return { data: r, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function generateTokens(_id: string) {
  var r = await jwt.sign({ user: { _id } }, conf.secret, {
    expiresIn: conf.expiresIn,
  });
  return { accessToken: r };
}
