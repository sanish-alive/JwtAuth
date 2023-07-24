require('dotenv').config()
const express = require("express")
const connectDb = require("./config/Database")
const app = express()
const authRoute = require("./routes/AuthRoute")

// Database connection
connectDb()

app.use(express.json())


app.get("/", (req, res) => {
    return res.status(200)
    .json({ message: "Hello Friend."})
})

app.use("/api/auth", authRoute)



const server = app.listen(process.env.PORT, () => console.log(`Server Connected to port ${process.env.PORT}`))

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})