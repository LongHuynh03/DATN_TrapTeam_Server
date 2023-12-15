const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
  blog_id: ObjectId,
  user_id: { type: ObjectId, ref: "user" },
  content: String,
  image: String,
  created_at: { type: Date, default: Date.now()},
  status: Boolean,
}, );

module.exports = mongoose.models.blog || mongoose.model("blog", blogSchema);
