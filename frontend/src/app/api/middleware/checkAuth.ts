import jwt from "jsonwebtoken";

import { cookies } from 'next/headers';

export const verifyJwtToken = async () => {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        
        if (!token) {
            throw new Error("Unauthorized No token");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error("Unauthorized");
    }
};