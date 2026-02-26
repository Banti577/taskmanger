import { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken';

export interface AuthJwtPayload extends JwtPayload {
    id: Types.ObjectId,
    fullname: string,
    email: string,
    gender: string,
}



