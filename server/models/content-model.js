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
  },
  location: {
    type: String,
  },
  blog: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Uploaded"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const Content = mongoose.model("Content", ContentSchema);
module.exports = Content;
