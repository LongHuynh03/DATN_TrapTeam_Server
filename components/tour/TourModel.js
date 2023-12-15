const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const tourSchema = new Schema({
  tour_id: ObjectId,
  province_id: {
    type: ObjectId,
    ref: "province",
  },
  name: String,
  description: String,
  available_seats: Number,
  image: String,
  price: Number,
  departure_date: Date,
  departure_location: String,
  end_date: Date,
  status: {type: Boolean, default: true},
  created_at: { type: Date, default: Date.now() },
  is_popular: {type: Boolean, default: false },
  schedules: [String],
  locations: [
    {
      type: ObjectId,
      ref: "location",
    },
  ],
});

module.exports = mongoose.models.tour || mongoose.model("tour", tourSchema);
