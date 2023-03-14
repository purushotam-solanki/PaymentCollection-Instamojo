const router = require("express").Router();
const Insta = require("instamojo-nodejs")
const { uuid } = require("uuidv4")

const { Payments } = require("../database/schema/Payment")

router.get('/list', async (req, res) => {
    try {
        const result = await Payments.find({});
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: "Internal Server Errors" })
    }
})

router.post("/create", async (req, res) => {
    try {
        const paymentId = uuid()
        const { payment } = req.body
        payment.paymentId = paymentId
        payment.status = "created"
        await Payments.create(payment)
        res.status(200).json({ status: true, message: "Payment created successfully" })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})

router.post('/pay', async (req, res) => {
    try {
        const { payment } = req.body || {}
        let data = new Insta.PaymentData();

        data.purpose = payment.purpose;            // REQUIRED
        data.amount = payment.amount;                  // REQUIRED
        data.setRedirectUrl(`${process.env.CLIENT_BASE_URL}/success`);
        // data.webhook = "http://localhost:5000/webhook"
        const response = Insta.createPayment(data, function (error, response) {
            if (error) {
                // some error
                console.log(error)
            } else {
                // Payment redirection link at response.payment_request.longurl
                const responseData = JSON.parse(response)
                //updating the status and providerId of payment
                Payments.findOneAndUpdate(
                    { paymentId: payment.paymentId },
                    { $set: { status: "pending", providerId: responseData.payment_request.id } }
                ).then(result => console.log(result))
                res.json({ status: true, message: responseData.payment_request.longurl })
            }
        });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})

module.exports = router