const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;


const authenticate = async (req, res, next) => {
  try {
    console.log("he")
    const token = req.cookies.ecommerce;
   
    const verifyToken = jwt.verify(token, secretKey);
    console.log(verifyToken);

    const rootUser = await USER.findOne({
      _id: verifyToken._id,
      "tokens.token": token
    });
    console.log(rootUser);
    if (!rootUser) {
      throw new error("user not found ");
    }
    req.token = token;
    req.rootUser= rootUser;
    req.userID=rootUser._id;
    next();
  } catch (error) { res.status(401).send("Unauthorized:No token provided");
  console.log(error);}
};

module.exports = authenticate;