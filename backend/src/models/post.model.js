import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    autor: {
      type: mongoose.Schema.ObjectId,
      trim: true,
      required: true,
    },
    comments: [{
      type: mongoose.Schema.ObjectId,
      ref: "Comment"
    }],
    imageURL: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }, { timestamps: true, versionKey: false });

export default mongoose.model("Post", postSchema);