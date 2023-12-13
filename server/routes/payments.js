const express = require("express")
const router = express.Router()

// models
const { Payment } = require("../models/Customer")

// get all payments

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find({})
    res.json(payments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// add new payment
router.post("/", async (req, res) => {
  const payment = new Payment({
    // paymentId: req.body.paymentId,
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact
    // installationDate: req.body.installationDate
  })
  try {
    const newPayment = await payment.save()
    res.status(201).json(newPayment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// get one payment

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const payment = await Payment.findById(id)
    res.json(payment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// update one payment
router.patch("/:id", async (req, res) => {
  const { id } = req.params
  const payment = await Payment.findOneAndUpdate(
    { _id: id },
    {
      ...req.body
    }
  )
  res.status(200).json(payment)
})

// delete one payment
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const payment = await Payment.findByIdAndDelete(id)
    res.send(payment.name + " has been deleted")
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
