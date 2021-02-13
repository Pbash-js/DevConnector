const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const User = require("../../models/UserModel");

router.post(
  "/",
  [
    check("name", "Enter a valid name").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please Enter a password with 6 or more charachters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: "User already found" }],
        });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      //salting the password before saving it to the server:

      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("Cmon bois lssgo!");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
