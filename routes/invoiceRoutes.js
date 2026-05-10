const express = require("express");
const router=express.Router();
const invoiceController=require("../controllers/invoiceController");

//show form
router.get("/new",invoiceController.showForm);

//save invoice
router.post("/",invoiceController.createInvoice);

//show all invoices
router.get("/",invoiceController.getAllInvoices);

//download PDF
router.get("/:id/pdf", invoiceController.downloadPDF);  

//show single invoice
router.get("/:id", invoiceController.showInvoice);

//edit invoice
router.get("/:id/edit", invoiceController.editForm);

//update invoice
router.put("/:id", invoiceController.updateInvoice);

//delete
router.delete("/:id",invoiceController.deleteInvoice);




module.exports=router;
