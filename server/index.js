const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")

// import routes
const Customer = require("./routes/customers")
const Payments = require("./routes/payments")

// init app
const app = express()

// ENVs
const PORT = process.env.PORT || 4000
const DB = process.env.MONGO_URI

// middlewares
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// connect to DB
mongoose.set("strictQuery", false)
mongoose.connect(DB).then(() => {
  app.listen(PORT, () => {
    console.log(`connected to DB and server is running on port ${PORT}`)
  })
})

// routes
app.use("/api/customers", Customer)
app.use("/api/payments", Payments)
