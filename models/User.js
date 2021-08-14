import pkg from "mongoose";
const { Schema, model, Types } = pkg;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lImg: { type: String, default: "" },
  sImg: { type: String, default: "" },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  city: { type: String, required: true },
  education: { type: String, default: "" },
  birth: { type: String, default: "" },
  phone: { type: String, default: "" },
  book: { type: String, default: "" },
  status: { type: String, default: "" },
  friends: [{ type: Types.ObjectId, ref: "User" }],
  music: [{ type: Types.ObjectId, ref: "Music" }],
  date: { type: Date, default: Date.now },
  order: { type: Number },
});

export default model("User", userSchema);
