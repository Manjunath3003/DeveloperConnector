const express = require("express");
const router = express.Router();

//@route GET api/posts
//@descr Test route
//@access public

router.get("/", (req, res) => res.send("posts root"));

module.exports = router;
