const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const locationSchema = new Schema({
  location_id: ObjectId,
  province_id: { type: ObjectId, ref: "province" },
  name: String,
  image: String,
  description: String,
  is_popular: Boolean,
  deleted:  { type: Boolean, default: false },
});

module.exports =
  mongoose.models.location || mongoose.model("location", locationSchema);
