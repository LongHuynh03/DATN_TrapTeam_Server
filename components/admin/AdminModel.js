const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
  admin_id: ObjectId,
  name: String,
  password: String,
}, );

module.exports = mongoose.models.admin || mongoose.model("admin", adminSchema);
