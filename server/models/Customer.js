const mongoose = require("mongoose")
const { Schema } = mongoose

const paymentDueSchema = new Schema({
  month: {
    type: String,
    required: true
  },
  amountDue: {
    type: Number,
    required: true
  }
})

const paymentSchema = new Schema({
  amountPaid: {
    type: Number
    // required: true
  },
  oRNumber: {
    type: Number
    // required: true
  },
  date: {
    type: Date
    // required: true
  },
  paymentDue: {
    type: paymentDueSchema
    // required: true
  }
})

const customerSchema = new Schema({
  customerId: {
    type: String
    // required: true
  },
  name: {
    type: String,
    unique: true
    // required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  installationDate: {
    type: Date
    // required: true
  }
  // payments: [
  //   {
  //     type: paymentSchema,
  //     required: true
  //   }
  // ]
})

const PaymentDue = mongoose.model("PaymentDue", paymentDueSchema)
const Payment = mongoose.model("Payment", paymentSchema)
const Customer = mongoose.model("Customer", customerSchema)

module.exports = { PaymentDue, Payment, Customer }
