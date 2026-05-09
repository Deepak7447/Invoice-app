const express=require("express");
const mongoose=require("mongoose");
const Invoice=require("./models/invoice");

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


app.get("/create-test",async(req,res)=>{
    const newInvoice=new Invoice({
        customerName:"Deepak",
        items:[
            {
                name:"mobile",
                quantity:2,
                price:30000
            },
            {
                name:"laptop",
                quantity:1,
                price:50000
            }
        ],

        subtotal:110000,
        gst:12000,
        total:122000
    });

    await newInvoice.save();
    res.send("Test inovice created");
})
app.listen(3000,()=>{
console.log("server is runnign");
});