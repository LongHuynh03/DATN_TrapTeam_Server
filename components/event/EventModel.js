const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const eventSchema = new Schema({
  event_id: ObjectId,
  province_id: { type: ObjectId, ref: "province" },
  title: String,
  image: String,
  deleted: { type: Boolean, default: false },
});



module.exports = mongoose.models.event || mongoose.model("event", eventSchema);
