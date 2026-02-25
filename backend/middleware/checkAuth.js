const jwt = require('jsonwebtoken')
const verifyjwttoken = (token) => {
    return (req, res, next) => {
        try {
            const cookie = req.cookies[token]?.trim();
            if (!cookie) return res.status(401).json({ msg: '401 Unauthorize access please login first' });
            const userPayload = jwt.verify(cookie, process.env.JWT_SECRET)
            req.user = userPayload;
            next();

        } catch (err) {
            return res.status(500).json({ msg: err });
           
        }
    }

}

module.exports = { verifyjwttoken };