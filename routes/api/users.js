const express = require("express");
const router = express.Router();

//@route GET api/user
//@descr Test route
//@access public

router.get("/", (req, res) => res.send("user root"));

module.exports = router;
