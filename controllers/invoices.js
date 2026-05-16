exports.dashboard = async(req,res)=>{

    const invoices = await Invoice.find({
        user:req.user._id
    });

    const totalInvoices = invoices.length;

    const totalRevenue = invoices.reduce(
        (sum,invoice)=>sum+invoice.total,
        0
    );

    const paidInvoices = invoices.filter(
        invoice=>invoice.status==="Paid"
    ).length;

    const unpaidInvoices = invoices.filter(
        invoice=>invoice.status==="Unpaid"
    ).length;

    res.render(
        "dashboard",
        {
            totalInvoices,
            totalRevenue,
            paidInvoices,
            unpaidInvoices
        }
    );

};