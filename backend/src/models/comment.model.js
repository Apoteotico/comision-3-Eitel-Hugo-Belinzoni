import {Schema, model} from "mongoose";

const commentSchema = new Schema(
  {
    autor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Comment", commentSchema)