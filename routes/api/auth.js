const express = require("express");
const router = express.Router();

//@route GET api/auth
//@descr Test route
//@access public

router.get("/", (req, res) => res.send("auth root"));

module.exports = router;
