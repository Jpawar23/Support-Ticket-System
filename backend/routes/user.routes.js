const express = require("express");

const { createuser, getuser } = require("../controller/user.controller");
const router = express.Router();

router.post("/register", createuser);
router.post("/login", getuser);

module.exports = router;
