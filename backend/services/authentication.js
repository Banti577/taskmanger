const jwt = require('jsonwebtoken');
const generatejwttoken = (user) => {
    const payload = {
        id: user._id,
        fullname: user.fullName,
        email: user.email,
        gender: user.gender,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = { generatejwttoken }