const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { signout, signup,signin ,isSignedIn} = require("../controller/auth");



//routes
router.get("/signout", signout);

//post route for signup and check validation
router.post(
  "/signup",
  [
    check("name").isLength({min: 3})
    .withMessage("Enter Proper Name With Length More Than 3"),
    
    check("email").isEmail().withMessage("Enter Proper Email"),
    
    check("password").isLength({ min: 5})
    .withMessage("Enter Password Length Greater Than 5"),

  ],
  signup
);

router.post(
    "/signin",
    [
      
      check("email").isEmail().withMessage("Enter Proper Email"),
      
      check("password").isLength({ min: 5})
      .withMessage("Enter Password Length Greater Than 5"),
  
    ],
    signin
  );

router.get("/test",isSignedIn,(req,res)=>{
  res.json(req.auth)
});
module.exports = router;

