const User= require("../models/User");

exports.showSignup=(req,res)=>{
    res.render("signup");
};

exports.signup=async(req,res)=>{
    try{
        const {username,password,email}=req.body;

        const newUser= new User({username,email});

        await User.register(newUser,password);

        res.redirect("/login");

    }
    catch(err){
        console.log(err);
        res.send("Signup failed");
    }
};




exports.showLogin=(req,res)=>{
    res.render("login");
};

exports.logout = (req,res,next)=>{

    req.logout((err)=>{

        if(err){

            return next(err);

        }

        res.redirect("/login");

    });

};