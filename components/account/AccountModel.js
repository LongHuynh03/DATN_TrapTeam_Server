const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const accountSchema = new Schema({
  user_id: ObjectId,
  phone_number: String,
  name: String,
  email: String,
  avatar: String,
  created_at: { type: Date, default: Date.now() },
});

module.exports =
  mongoose.models.account || mongoose.model("user", accountSchema);
