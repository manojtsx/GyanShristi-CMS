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
  }
});

const Category = mongoose.model("Category", CategorySchema)
module.exports = Category;
