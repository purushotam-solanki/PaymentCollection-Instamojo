require('dotenv').config()
const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
const Insta = require("instamojo-nodejs")
const path = require("path")

//Seprating internal imports from external imports
const paymentsController = require("./controller/paymentsController")
const webhookController = require("./controller/webhookController")

const PORT = process.env.PORT

//Connecting to db as soon as Server is started
require("./database/index")

const app = express();

//Enabling CORS 
app.use(cors({
    origin: [`${process.env.CLIENT_BASE_URL}`]
}))

app.use(bodyParser.json())

//Setting keys for InstaMojo
Insta.setKeys(process.env.INSTAMOJO_API_KEY, process.env.INSTAMOJO_AUTH_KEY);
Insta.isSandboxMode(true);

//All router handlers
app.use("/payment", paymentsController)
app.use("/webhook", webhookController)

//serving react app on production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client', 'build')))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`)
})