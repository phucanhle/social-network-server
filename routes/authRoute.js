const express = require("express");
const router = express.Router();
const Users = require("../controllers/userController");

router.post("/register", Users.register);
router.post("/login", Users.login);

module.exports = router;
