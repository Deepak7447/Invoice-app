const mongoose=require("mongoose");

const itemSchema=new mongoose.Schema({
    name:String,
    quantity:Number,
    price:Number
});

const invoiceSchema=new mongoose.Schema({
    customerName:{
    type:String,
    required:true
    },

    items:[itemSchema],
    subtotal:Number,
    gst:Number,
    total:Number,

    status:{
        type:String,
        enum:["Paid","Unpaid"],
        default:"Unpaid"
    },

    user:{

    type:mongoose.Schema.Types.ObjectId,

    ref:"User"

},

    createdAt:{
        type:Date,
        default:Date.now}
});




module.exports=mongoose.models.Invoice || mongoose.model("Invoice",invoiceSchema);