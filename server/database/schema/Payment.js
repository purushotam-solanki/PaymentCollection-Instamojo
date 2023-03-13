const mongoose = require("mongoose")

const PaymentSchema = new mongoose.Schema({
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
    paymentId: {
        type: String,
        required: true
    },
    providerId: String
}, {
    timestamps: true
})

const Payments = mongoose.model("payments", PaymentSchema)
module.exports = { Payments }