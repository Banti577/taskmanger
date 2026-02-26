import bcryptjs from 'bcryptjs'

import User from '../Models/usersModel'

import { generatejwttoken } from '../services/authentication';
import { SignupUser, LoginUser } from '@/lib/types/AuthInterface/authInterface';
import {MUser} from '@/lib/types/ModelInterface/usermodel.interface'


export const handleSignup = async (body: SignupUser) => {
    const { fullname, email, password, gender } = body;

    const isExist: MUser | null = await User.findOne({ email });

    if (isExist) {
        throw new Error("User already exists");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
        fullName: fullname,
        email,
        password: hashPassword,
        gender
    });

    await newUser.save();
    return newUser;
};


export const handleLogin = async (body: LoginUser) => {

    const { email, password } = body;
    const isExist:MUser | null = await User.findOne({ email })

    if (!isExist) {
        throw new Error("User not found");
    }
    const isMatch = await bcryptjs.compare(password, isExist.password)
    if (!isMatch) { throw new Error('Password not Match') }

    const token = generatejwttoken(isExist)

    return { user: isExist, token };

}

const handleLogout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            path: '/'
        });
        return res.status(200).json({ message: 'Logged out successfully' });

    } catch (err) {

        console.log(err)

    }
}




