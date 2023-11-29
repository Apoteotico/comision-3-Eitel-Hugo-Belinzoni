
const mongoose = require("mongoose")
const Comment = require("./comment")
const slugify = require("slugify")

const StorySchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    slug: String,
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true,
        minlength: [4, "Please provide a title least 4 characters "],
    },
    content: {
        type: String,
        required: [true, "Please a provide a content "],
        minlength: [10, "Please provide a content least 10 characters "],
    },
    image: {
        type: String,
        default: "default.jpg"
    },
    readtime: {
        type: Number,
        default: 3
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    comments: [{
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
    }],
    commentCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Story = mongoose.model("Story", StorySchema)

module.exports = Story;