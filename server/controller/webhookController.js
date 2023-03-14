const router = require("express").Router();

const VALID_STATUS = require("../utils/constant")
const { Invoices } = require("../database/schema/Invoice")

router.post("/instamojo", async (req, res) => {
    try {
        console.log("webhook request: " + req)
        // const { data } = req.body;
        // let status = VALID_STATUS.includes(data.status.toLowerCase()) ? "success" : data.status.toLowerCase();
        // await Payments.findOneAndUpdate({ providerId: data.payment_request_id }, { $set: { status: status } })
        // console.log("webhook end point hit")
        res.status(200).end()
    } catch (err) {
        res.status(504).end()
    }
})

module.exports = router
