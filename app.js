const express=require("express");
const mongoose=require("mongoose");
const app=express();


mongoose.connect("mongodb://127.0.0.1:27017/invoiceDB")
.then(()=>{
    console.log("Connected  to the database");
})
.catch(err=>{
    console.log("error in connecting to databse")
})

app.get("/",(req,res)=>{
res.send("Hello Worlds");
});

app.listen(3000,()=>{
console.log("server is runnign");
});