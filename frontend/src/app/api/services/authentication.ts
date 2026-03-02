import jwt from 'jsonwebtoken'

import { AuthJwtPayload } from '@/lib/types/JwtInterface'

export const generatejwttoken = (user) => {

    const payload: AuthJwtPayload = {
        id: user._id,
        fullname: user.fullName,
        email: user.email,
        gender: user.gender,
    }

    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    )

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESS_TOKEN_SECRET as string,
        { expiresIn: '10d' }
    )

    return { accessToken, refreshToken }
}

export const generateAccessToken = (user) => {
    const payload: AuthJwtPayload = {
        id: user._id,
        fullname: user.fullName,
        email: user.email,
        gender: user.gender,
    }

    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    )

    return { accessToken }
}