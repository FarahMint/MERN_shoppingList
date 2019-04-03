const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
//User   Model
const User = require("../../model/User");

// CREATE ROUTES to authenticate user

//@route POST api/auth
// @desc Register new User items
//@ access Public

router.post("/", (req, res) => {
  const { email, password } = req.body;

  //  validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //  check for user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      // create token
      jwt.sign(
        {
          id: user.id
        },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          // send response
          res.json({
            //To authenticate with private route
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

/** Validate user with the token */
//@route GET  api/auth/user
// @desc Get user data
//@ access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password") // disregard the pwd
    .then(user => res.json(user));
});

module.exports = router;
//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
