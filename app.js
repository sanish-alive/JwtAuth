const express = require("express")
const port =  5000
const app = express()

app.get("/", (req, res) => {
    return res.status(200)
    .json({ message: "Hello Friend."})
})

app.listen(port, () => console.log(`Server Connected to port ${port}`))