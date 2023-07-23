const Mongoose = require("mongoose")
const localDb = `mongodb://localhost:27017/jwtauth`

const connectDb = async () => {
    await Mongoose.connect(localDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Mongo Database Connected")
}

module.exports = connectDb