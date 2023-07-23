const express = require("express")
const connectDb = require("./config/database")
const port =  5000
const app = express()

connectDb()

app.get("/", (req, res) => {
    return res.status(200)
    .json({ message: "Hello Friend."})
})

const server = app.listen(port, () => console.log(`Server Connected to port ${port}`))

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})