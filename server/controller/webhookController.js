const router = require("express").Router();

const VALID_STATUS = require("../utils/constant")
const { Payments } = require("../database/schema/Payment")

router.post("/instamojo", async (req, res) => {
    try {
        console.log("webhook request: " + JSON.stringify(req))
        const { data } = req.body;
        let status = VALID_STATUS.includes(data.status.toLowerCase()) ? "success" : data.status.toLowerCase();
        await Payments.findOneAndUpdate({ providerId: data.payment_request_id }, { $set: { status: status } })
        console.log("webhook end point hit")
        res.status(200).json({ status: true, message: "webhook processed" })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})

module.export = router