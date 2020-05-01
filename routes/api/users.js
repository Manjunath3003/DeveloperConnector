const express = require("express");
const router = express.Router();
//from express-validator Documentation
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// user model
const User = require("../../models/User");

//@route POST api/user
//@descr Resgister user
//@access public
router.post(
  "/",
  // sets validation
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please incluse a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req); // results from the validation
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // see if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }

      // Get user avatar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      // create new instance to store
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("servererror");
    }
  }
);
module.exports = router;
