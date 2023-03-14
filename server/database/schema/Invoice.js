const mongoose = require("mongoose")

const InvoiceSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    invoiceId: {
        type: String,
        required: true
    },
    paymentId: String
}, {
    timestamps: true
})

const Invoices = mongoose.model("invoices", InvoiceSchema)
module.exports = { Invoices }