const bcryptjs = require('bcryptjs');

const User = require("../Models/usersModel");
const { generatejwttoken } = require("../services/authentication");

const handleSignup = async (req, res) => {
    try {
        const { fullname, email, password, gender } = req.body;
        const isExist = await User.find({ email })

        if (isExist.length > 0) return res.status(409).json({ msg: 'User Already Exist' })
        const salt = await bcryptjs.genSalt(10);

        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fullName: fullname,
            email,
            password: hashPassword,
            gender
        })
        await newUser.save();
        return res.status(201).json({ msg: 'suceessfull' })

    } catch (err) {
        return res.status(500).json({ msg: 'signup failed please try after some time' })
    }
}

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isExist = await User.findOne({ email })
        if (!isExist) return res.status(404).json({ msg: "User Not Exist" });

        const isMatch = await bcryptjs.compare(password, isExist.password)
        if (!isMatch) return res.status(401).json('Password not Match');

        const token = generatejwttoken(isExist)

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            sameSite: 'lax',
            secure: false,
            
        })
        return res.status(200).json(`Welcome Again ${isExist.fullName}`);

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Login failed please try after some time' })
    }
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

module.exports = { handleSignup, handleLogin, handleLogout }