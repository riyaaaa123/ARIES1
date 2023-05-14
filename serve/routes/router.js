const express = require("express");
const router = new express.Router();
const Products = require("../models/productSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    //  //  console.log(productsdata + "data mila hain");
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const individual = await Products.findOne({ id: id });
    console.log(individual + "ind mila hai");
    res.status(201).json(individual);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post("/register", async (req, res) => {
  //console.log(req.body);
  const { fname, email, phoneno, password, cpassword } = req.body;

  if (!fname || !email || !phoneno || !password || !cpassword) {
    res.status(422).json({ error: "filll the all details" });
    console.log("no data available");
  }
  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(410).json({ error: "This email is already existing" });
    } else if (password !== cpassword) {
      res.status(412).json({ error: "password are not matching" });
    } else {
      const finaluser = new USER({
        fname,
        email,
        phoneno,
        password,
        cpassword,
      });

      // yaha pe hasing krenge

      const storedata = await finaluser.save();
      console.log(storedata + "user successfully added");
      res.status(201).json(storedata);

      // const token = await storedata.generateAuthtoken();
      //   console.log(token);
      //   res.cookie("ecommerce", token, {
      //     expires: new Date(Date.now() + 16000000),
      //     httpOnly: true,
      //   });
      
    }
  } catch (error) {
    // console.log("error the bhai catch ma for registratoin time" + error.message);
    // res.status(422).send(error);
  }
});
router.post("/login", async (req, res) => {
  //console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "fill the data" });
  }
  try {
    const userlogin = await USER.findOne({ email: email });
    console.log(userlogin);
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      console.log(isMatch);
      //generate token

      if (!isMatch) {
        res.status(400).json({ error: "invalid details" });
      } else {
        const token = await userlogin.generateAuthtoken();
        console.log(token);
        res.cookie("ecommerce", token, {
          expires: new Date(Date.now() + 1600000),
          httpOnly: true,
        });
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "invalid details" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalid details" });
    console.log("error in catch");
  }
});
//adding the data into cart
router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    console.log("hehe niceeee");
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    console.log(cart + "lololo cart");
    const UserContact = await USER.findOne({ _id: req.userID });
    console.log(UserContact);
    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);
      res.status(201).json(UserContact);
    }
  } catch (error) {
    res.status(401).json({ error: "invalid user" });
  }
});
router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    console.log(buyuser);
    res.status(201).json(buyuser);
  } catch (error) {
    console.log(error + "error");
  }
});
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validuserone = await USER.findOne({ _id: req.userID });
    console.log(validuserone);
    res.status(201).json(validuserone);
  } catch (error) {
    console.log(error + "error");
  }
});
//remove object
router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    const { _id} = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((cruval) => {
     
       return cruval._id!= _id;
    });
    console.log(req.rootUser._id+ "jdfjvnfj");

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("item remove");
  } catch (error) {
    console.log("error: " + error);
    res.status(400).json(req.rootUser);
  }
});

router.get("/logout",authenticate, async(req,res)=>{
try{
  req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
    return curelem.token !== req.token
});


res.clearCookie("ecommerce",{path:"/"});

req.rootUser.save();
res.status(201).json(req.rootUser.tokens); 
console.log("uuser logout");

}
catch(error){
  console.log("error for logout")
}
})

module.exports = router;
