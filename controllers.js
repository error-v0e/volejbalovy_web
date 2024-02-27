const express = require("express");
const router = express.Router();
const User = require("./models");
const passport = require("passport");
const bcrypt = require("bcrypt");

// User registration route
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, password, confirmpassword } = req.body;

  if (!username || !email || !password || !confirmpassword) {
    return res
      .status(403)
      .render("public_views/register", { error: "All Fields are required" });
  }

  if (confirmpassword !== password) {
    return res
      .status(403)
      .render("public_views/register", { error: "Password do not match" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res
        .status(409)
        .render("public_views/register", { error: "Username already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.redirect("/login");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// User login route
router.post("/login", passport.authenticate("local", { session: false }),
  (req, res) => {
    req.session.name = req.body.username;
    req.session.save();

    return res.redirect("/sprava");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/sprava");
});

module.exports = router;