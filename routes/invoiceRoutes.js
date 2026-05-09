const express = require("express");
const router=express.Router();
const invoiceController=require("../controllers/invoiceController");

//show form
router.get("/new",invoiceController.showForm);

//save invoice
router.post("/",invoiceController.createInvoice);

//show all invoices
router.get("/",invoiceController.getAllInvoices);

module.exports=router;
