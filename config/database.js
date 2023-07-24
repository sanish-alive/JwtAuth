const Mongoose = require("mongoose")
const localDb = process.env.DATABASE_URL

const connectDb = async () => {
    await Mongoose.connect(localDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Mongo Database Connected")
}

module.exports = connectDb