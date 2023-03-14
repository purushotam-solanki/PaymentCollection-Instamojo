const mongoose = require("mongoose")

const MONGODB_URL = process.env.MONGODB_URL

// const connect = (MONGODB_URL) => {
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
console.log("connected to db")
});
// }

// module.export = connect