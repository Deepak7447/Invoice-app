const Invoice = require("../models/invoice");

// Show Form
exports.showForm = (req, res) => {
    res.render("new");
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