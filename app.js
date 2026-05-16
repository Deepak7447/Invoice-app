const express=require("express");
const mongoose=require("mongoose");
const session=require("express-session");


const User=require("./models/User");
const passport = require("./config/passport");
const authRoutes= require("./routes/authRoutes");




const methodOverride = require("method-override");
const app=express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:"mysamsecretkey",
    resave:false,
    saveUninitialized:false
}))
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);





mongoose.connect("mongodb://127.0.0.1:27017/invoiceDB")
.then(()=>{
    console.log("Connected  to the database");
})
.catch(err=>{
    console.log("error in connecting to databse")
})

//home route
app.get("/",(req,res)=>{
res.send("Hello Worlds");
});



//show all invoices
app.use("/invoices", require("./routes/invoiceRoutes"));


app.listen(3000,()=>{
console.log("server is runnign");
});