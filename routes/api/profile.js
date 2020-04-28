const express = require("express");
const router = express.Router();

//@route GET api/profile
//@descr Test route
//@access public

router.get("/", (req, res) => res.send("profile root"));

module.exports = router;
