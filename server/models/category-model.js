const { default: mongoose } = require("mongoose");
const mnogoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  content_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Content"
  },
  parent_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Category"
  },
});

const Category = mongoose.model("Category", CategorySchema)
module.exports = Category;
