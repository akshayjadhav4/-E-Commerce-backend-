const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Problem occured while creating user account...",
      });
    }

    //CREATE TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // PUT TOKEN IN COOKIE
    res.cookie("token", token, { expire: new Date() + 9999 });
    //SEND RESPONSE TO FRONTEND
    const { _id, firstName, lastName, email, role } = user;
    return res.json({ token, user: { _id, firstName, lastName, email, role } });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User email does not exists...",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    //CREATE TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // PUT TOKEN IN COOKIE
    res.cookie("token", token, { expire: new Date() + 9999 });
    //SEND RESPONSE TO FRONTEND
    const { _id, firstName, lastName, email, role } = user;
    return res.json({ token, user: { _id, firstName, lastName, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Logged Out.",
  });
};

//PROTECTED ROUTES
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

//CUSTOME MIDDLEWARE
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: checker,
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
