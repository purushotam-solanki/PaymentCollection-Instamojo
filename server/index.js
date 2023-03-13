require('dotenv').config()
// bkFusJScoIDphHmv
const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
const Insta = require("instamojo-nodejs")

//Seprating internal imports from external imports
const paymentsController = require("./controller/paymentsController")

const PORT = process.env.PORT || 5000

//Connecting to db as soon as Server is started
require("./database/index")

const app = express();

app.use(cors({
    origin: ['http://localhost:3000']
}))

app.use(bodyParser.json())
//Setting keys for InstaMojo
Insta.setKeys(process.env.INSTAMOJO_API_KEY, process.env.INSTAMOJO_AUTH_KEY);
Insta.isSandboxMode(true);

app.use("/payment", paymentsController)
app.post("/webhook", (req, res) => {
    console.log("webhook end point hit")
})
app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`)
})