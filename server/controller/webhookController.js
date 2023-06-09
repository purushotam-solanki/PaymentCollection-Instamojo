const router = require("express").Router();

const { VALID_STATUS } = require("../utils/constant")
const { Invoices } = require("../database/schema/Invoice")

router.post("/instamojo", async (req, res) => {
    try {
        console.log(req.body)
        let status = VALID_STATUS.includes(req.body.status.toLowerCase()) ? "paid" : data.status.toLowerCase();
        await Invoices.findOneAndUpdate({ paymentId: req.body.payment_request_id }, { $set: { status: status } })
        console.log("webhook end point hit")
        res.status(200).end()
    } catch (err) {
        res.status(500).end()
    }
})

module.exports = router
