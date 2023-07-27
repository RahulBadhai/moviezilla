const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helpers/dbErrorHandler");
const expressjwt = require("express-jwt");
exports.signup = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({
        user,
      });
    })
    .catch((error) => {
      res.status(400).json({
        err: errorHandler(error),
      });
    });
  //  user.save((err,user)=>{
  //     if(err){
  //         return res.status(400).json({
  //             err:errorHandler(err)
  //         });
  //     }
  //     user.salt =  undefined
  //     user.hashed_password = undefined
  //     res.json({
  //         user
  //     });
  // });
};
exports.signin = (req, res) => {
  const { email, password } = req.body; //get login crediential from user
  User.findOne({ email })
    .then((user) => {
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password dont match",
        });
      }
      // generate a signed token with user id and secret
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      // persist the token as 't' in cookie with expiry date
      res.cookie("t", token, { expire: new Date() + 9999 });
      const { _id,fname,lname,email,role } = user; //destructure of array
      return res.json({ token, user: { _id,fname,lname,email, role } });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "user with this email is not exist",
      });
    }); 
};
exports.signout = (req , res) => {
  res.clearCookie("t");
  res.json({message:"signout successful"}); // it is json response work like dictionary in python
};
