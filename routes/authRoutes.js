const express = require("express");
const router= express.Router();
const passport= require("passport");
const authController = require("../controllers/Authcontroller");

router.get("/signup",authController.showSignup);
router.post("/signup",authController.signup);
module.exports=router;


router.get("/login", authController.showLogin);

router.post(
    "/login",
    passport.authenticate("local",{
        successRedirect:"/invoices",
        failureRedirect:"/login"
    })
);

router.get("/logout", authController.logout);