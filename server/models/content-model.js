const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content_type: {
    type: String,
    enum: ["pdf", "video", "post"],
    required: true,
  },
  location: {
    type: String,
  },
  blog: {
    type: String,
  },
  thumbnail: {
    type: String,
    default:
      "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  status: {
    type: String,
    enum: ["Pending", "Uploaded", "Rejected"],
    default: "Pending",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

ContentSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Content = mongoose.model("Content", ContentSchema);
module.exports = Content;
