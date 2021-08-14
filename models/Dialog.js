import pkg from "mongoose";
const { Schema, model, Types } = pkg;

const dialogSchema = new Schema({
  speakerOne: { type: Types.ObjectId, ref: "User" },
  speakerTwo: { type: Types.ObjectId, ref: "User" },
  messages: [{ type: Types.ObjectId, ref: "Message" }],
  date: { type: Date, default: Date.now },
});

export default model("Dialog", dialogSchema);
