import mongoose from 'mongoose';
import { MUser } from '@/lib/types/ModelInterface/usermodel.interface'

const userSchema = new mongoose.Schema<MUser>({
    fullName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    refreshToken:{
        type: String, 
    }
}, { timestamps: true })

userSchema.index({ email: 1 }, { unique: true });


export default mongoose.models.user || mongoose.model<MUser>('user', userSchema);