const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bookingtourSchema = new Schema({
  bookingtour_id: ObjectId,
  user_id: { type: ObjectId, ref: "user" },
  tour_id: { type: ObjectId, ref: "tour" },
  discount: Number,
  created_at: { type: Date, default: Date.now()},
  adult_count: Number,
  child_count: Number,
  price: Number,
  note: String,
  role: Boolean,
  location_custom: [
    {
      type: ObjectId,
      ref: "location",
    },
  ],
});

module.exports =
  mongoose.models.bookingtour ||
  mongoose.model("bookingtour", bookingtourSchema);
