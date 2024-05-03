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
  ownStock: {
    type: Boolean,
    required: [true, "OwnStock not defined!"],
  },
});

const Item = models.Item || model("Item", ItemScema);

export default Item;
