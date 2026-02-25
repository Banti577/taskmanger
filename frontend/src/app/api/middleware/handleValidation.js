const { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } = require("../utils/validationHelper");

const handleValidation = (req, res, next) => {
    try {
        const { fullname, email, password, gender } = req.body;

        if (!fullname || !email || !gender || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!NAME_REGEX.test(fullname)) {
            return res.status(400).json({ message: "Invalid full name" });
        }
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        if (!["male", "female", "other"].includes(gender.toLowerCase())) {
            return res.status(400).json({ message: "Invalid gender" });
        }
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json("Invalid password formate");
        }
        next();
    }
    catch (err) {
        console.log(err)
    }

}

module.exports = { handleValidation }