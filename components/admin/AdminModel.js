const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
  admin_id: ObjectId,
  name: String,
  password: String,
}, );

module.exports = mongoose.models.admins || mongoose.model("admin", adminSchema);
