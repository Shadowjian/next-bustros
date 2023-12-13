const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// models
const { Customer } = require("../models/Customer")

// get all customers

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({})
    res.json(customers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// add new customer
router.post("/", async (req, res) => {
  const customer = new Customer({
    // customerId: req.body.customerId,
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact
    // installationDate: req.body.installationDate
  })
  try {
    const newCustomer = await customer.save()
    res.status(201).json(newCustomer)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// get one customer

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const customer = await Customer.findById(id)
    res.json(customer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// update one customer
router.patch("/:id", async (req, res) => {
  const { id } = req.params
  const customer = await Customer.findOneAndUpdate(
    { _id: id },
    {
      ...req.body
    }
  )
  res.status(200).json(customer)
})

// delete one customer
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const customer = await Customer.findByIdAndDelete(id)
    res.send(customer.name + " has been deleted")
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
