const config = require("config");
const jwt = require("jsonwebtoken");

// get the token that is send from react .... from whatever front end used
function auth(req, res, next) {
  // fetch token from the header
  const token = req.header("x-auth-token");

  //  check for token
  if (!token)
    // user unauth
    return res.status(401).json({ msg: "no token auth denied" });

  try {
    // verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token invalid" });
  }
}

module.exports = auth;
