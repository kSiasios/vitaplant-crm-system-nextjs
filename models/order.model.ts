import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
  clientName: {
    type: String,
    required: [true, "Client's name is required!"],
  },
  address: {
    type: String,
  },
  taxpayerNumber: {
    type: String,
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "Order Status not defined!"],
  },
  paymentStatus: {
    type: String,
    required: [true, "Payment Status not defined!"],
  },
  paymentAmount: {
    type: Number,
    required: [true, "Payment Amount not defined!"],
  },
  created: {
    by: { type: String, required: [true, "Creator not defined!"] },
    at: { type: String, required: [true, "Date of creation not defined!"] },
  },
  items: [
    {
      plant: {
        type: String,
        required: [true, "Subject not defined!"],
      },
      subject: {
        type: String,
        required: [true, "Subject not defined!"],
      },
      variety: {
        type: String,
        required: [true, "Variety not defined!"],
      },
      price: {
        type: Number,
      },
      amount: {
        type: Number,
      },
      stock: {
        own: {
          type: Boolean,
          required: [true, "OwnStock not defined!"],
        },
        distributor: {
          type: String,
        },
      },
    },
  ],
  comments: {
    type: String,
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
