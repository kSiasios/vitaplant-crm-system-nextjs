import { model, models, Schema } from "mongoose";

const OrderScema = new Schema({
  clientName: {
    type: String,
    required: [true, "Client's name is required!"],
  },
  address: {
    type: String,
    required: [true, "Delivery address is required!"],
  },
  taxpayerNumber: {
    type: String,
  },
  status: {
    type:String,
    required: [true, "Order Status not defined!"],
  },
  paymentStatus: {
    type:String,
    required: [true, "Payment Status not defined!"],
  },
  paymentAmount: {
    type: Number,
    required: [true, "Payment Amount not defined!"],
  },
  items: [
    {
        subject: {
            type: String,
            required: [true, "Subject not defined!"]
        },
        variety: {
            type: String,
            required: [true, "Variety not defined!"]
        },
        price: {
            type: Number,
            required: [true, "Price not defined!"]
        },
        amount: {
            type: Number,
            required: [true, "Amount not defined!"]
        },
        ownStock: {
            type: Boolean,
            required: [true, "OwnStock not defined!"]
        }
    }
  ]
});

const Order = models.Order || model("Order", OrderScema);

export default Order;