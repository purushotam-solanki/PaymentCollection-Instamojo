const router = require("express").Router();
const Insta = require("instamojo-nodejs")
const { uuid } = require("uuidv4")

const { Invoices } = require("../database/schema/Invoice")

router.get('/list', async (req, res) => {
    try {
        const result = await Invoices.find({});
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: err.message || "Internal Server Errors" })
    }
})

router.post("/create", async (req, res) => {
    try {
        const invoiceId = uuid()
        const { invoice } = req.body
        invoice.invoiceId = invoiceId
        invoice.status = "created"
        await Invoices.create(invoice)
        res.status(200).json({ status: true, message: "Invoice created successfully" })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})

router.post('/pay', async (req, res) => {
    try {
        const { invoice } = req.body || {}
        let data = new Insta.PaymentData();

        data.purpose = invoice.purpose;            // REQUIRED
        data.amount = invoice.amount;                  // REQUIRED
        data.setRedirectUrl(`https://instamojopayments.onrender.com/success`);
        // data.webhook = "http://localhost:5000/webhook"
        const response = Insta.createPayment(data, function (error, response) {
            if (error) {
                // some error
                console.log(error)
            } else {
                // Payment redirection link at response.payment_request.longurl
                const responseData = JSON.parse(response)
                //updating the status and providerId of payment
                if (responseData.success) {
                    Invoices.findOneAndUpdate(
                        { invoiceId: invoice.invoiceId },
                        { $set: { status: "pending", paymentId: responseData.payment_request.id } }
                    ).then(result => console.log(result)).
                        catch(err => { throw new Error(err) })
                }
                res.json({ status: true, message: responseData.payment_request.longurl })
            }
        });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})

module.exports = router