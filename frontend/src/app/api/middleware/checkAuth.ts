import jwt from "jsonwebtoken";


import {AuthJwtPayload} from '@/lib/types/JwtInterface'


export async function verifyJwtToken(token: string) {
  try {
    if (!token) throw new Error('Token missing');
    const decoded = jwt.verify(token,  process.env.JWT_SECRET) as AuthJwtPayload;

    return decoded;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}