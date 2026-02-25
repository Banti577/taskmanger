const { handleSignup, handleLogin, handleLogout } = require("../controller/userAuth");
const { handleValidation } = require("../middleware/handleValidation");
const { validateLogin } = require("../middleware/validateLogin");

const router = require('express').Router();

router.post('/signup', handleValidation, handleSignup)
router.post('/login', validateLogin, handleLogin)
router.get('/logout', handleLogout)

module.exports = router;