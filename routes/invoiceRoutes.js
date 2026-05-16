const express = require("express");
const router=express.Router();
const invoiceController=require("../controllers/invoiceController");
const {isLoggedIn}=require("../middleware/auth");

//show form
router.get("/new",isLoggedIn,invoiceController.showForm);

//save invoice
router.post("/",isLoggedIn,invoiceController.createInvoice);

//show all invoices
router.get("/",isLoggedIn,invoiceController.getAllInvoices);

//download PDF
router.get("/:id/pdf", isLoggedIn, invoiceController.downloadPDF);  

//show single invoice
router.get("/:id", isLoggedIn, invoiceController.showInvoice);

//edit invoice
router.get("/:id/edit", isLoggedIn, invoiceController.editForm);

//update invoice
router.put("/:id", isLoggedIn, invoiceController.updateInvoice);

//delete
router.delete("/:id",isLoggedIn,invoiceController.deleteInvoice);

//dashboard
router.get("/dashboard",isLoggedIn,invoiceController.dashboard);


//update status
router.put("/:id/status",isLoggedIn,invoiceController.updateStatus);

module.exports=router;
