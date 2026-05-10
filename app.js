const express=require("express");
const mongoose=require("mongoose");

const methodOverride = require("method-override");
const app=express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));


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