import { model, models, Schema } from "mongoose";

const UserScema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  isAdmin: {
    type: Boolean,
    required: [true, "IsAdmin is required!"],
  },
});

const User = models.User || model("User", UserScema);

export default User;
