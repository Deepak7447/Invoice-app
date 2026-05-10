const Invoice = require("../models/invoice");
const PDFDocument= require("pdfkit");

// Show Form
exports.showForm = (req, res) => {
    res.render("new");
};

// Update Invoice
exports.updateInvoice = async (req, res) => {

    const { customerName, itemName, quantity, price } = req.body;

    const subtotal = quantity * price;

    const gst = subtotal * 0.18;

    const total = subtotal + gst;

    await Invoice.findByIdAndUpdate(req.params.id, {

        customerName,

        items: [
            {
                name: itemName,
                quantity,
                price
            }
        ],

        subtotal,
        gst,
        total

    });

    res.redirect(`/invoices/${req.params.id}`);

};

// Create Invoice
exports.createInvoice = async (req, res) => {

    const { customerName, itemName, quantity, price } = req.body;

    const subtotal = quantity * price;

    const gst = subtotal * 0.18;

    const total = subtotal + gst;

    const newInvoice = new Invoice({

        customerName,

        items: [
            {
                name: itemName,
                quantity,
                price
            }
        ],

        subtotal,
        gst,
        total
    });

    await newInvoice.save();

    res.redirect("/invoices");
};

// Get All Invoices
exports.getAllInvoices = async (req, res) => {

    const invoices = await Invoice.find();

    res.render("index", { invoices });
};


exports.showInvoice = async (req,res)=>{
    const invoice=await Invoice.findById(req.params.id);
    res.render("show",{invoice});
};

exports.editForm = async (req, res) => {

    const invoice = await Invoice.findById(req.params.id);

    res.render("edit", { invoice });

};

exports.deleteInvoice = async (req, res) => {

    await Invoice.findByIdAndDelete(req.params.id);

    res.redirect("/invoices");
};

exports.downloadPDF = async (req, res) => {

    const invoice = await Invoice.findById(req.params.id);

    const doc = new PDFDocument();

    // File Name
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=invoice-${invoice._id}.pdf`
    );

    // PDF Type
    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    // Send PDF stream
    doc.pipe(res);

    // PDF Content
    doc.fontSize(25).text("Invoice", {
        align: "center"
    });

    doc.moveDown();

    doc.fontSize(16).text(`Customer: ${invoice.customerName}`);

    doc.text(`Status: ${invoice.status}`);

    doc.moveDown();

    doc.text("Items:");

    invoice.items.forEach(item => {

        doc.text(
            `${item.name} | Qty: ${item.quantity} | Price: ₹${item.price}`
        );

    });

    doc.moveDown();

    doc.text(`Subtotal: ₹${invoice.subtotal}`);

    doc.text(`GST: ₹${invoice.gst}`);

    doc.text(`Total: ₹${invoice.total}`);

    // Finish PDF
    doc.end();

};