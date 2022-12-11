const { UserModel } = require("../models/user.model");
const { signupCheck } = require("../middlewares/signup.check");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserRoute = express.Router();


UserRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {

        var token = await jwt.sign({ userID: user._id }, 'noteapp');
         return res.send(token)
      } else {
        return res.send({ msg: "Wrong Credentials" });
      }
    } else {
      return res.send({ msg: "Wrong Credentials" });
    }
  }
});



UserRoute.post("/signup", signupCheck, async (req, res) => {
  const { name, email, password } = req.body;
  const Haspass = await bcrypt.hash(password, 8);
  const newUser = new UserModel({ name, email, password: Haspass });
  await newUser.save();
  res.send({ msg: "user Signed Up successfully" });
});

module.exports = { UserRoute };
