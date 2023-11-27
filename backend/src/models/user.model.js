import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
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

export default mongoose.model('User', userSchema)