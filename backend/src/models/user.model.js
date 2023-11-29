import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  avatarURL: {
    type: String,
    required: false,
  }
}, {
    timestamps: true,
    versionKey: false,
})

export default model("User", userSchema);