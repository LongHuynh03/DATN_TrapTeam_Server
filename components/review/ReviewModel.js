const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const reviewSchema = new Schema({
    review_id: ObjectId,
    user_id: { type: ObjectId, ref: "user" },
    tour_id: { type: ObjectId, ref: "tour" },
    content: String,
    created_at: { type: Date, default: Date.now()},
});

module.exports =
    mongoose.models.review || mongoose.model("review", reviewSchema);
