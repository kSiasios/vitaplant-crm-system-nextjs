import { model, models, Schema } from "mongoose";

const ItemScema = new Schema({
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
    required: [true, "Price not defined!"],
  },
  amount: {
    type: Number,
    required: [true, "Amount not defined!"],
  },
  stock: {
    own: {
      type: Boolean,
      required: [true, "Own Stock not defined!"],
    },
    distributor: {
      type: String,
      // required: [true, "Distributor not defined!"],
    }
  },
});

const Item = models.Item || model("Item", ItemScema);

export default Item;
