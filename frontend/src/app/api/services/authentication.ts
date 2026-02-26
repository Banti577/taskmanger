import jwt from 'jsonwebtoken'

import {AuthJwtPayload} from '@/lib/types/JwtInterface'

export const generatejwttoken = (user) => {
    
    const payload : AuthJwtPayload = {
        id: user._id,
        fullname: user.fullName,
        email: user.email,
        gender: user.gender,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}