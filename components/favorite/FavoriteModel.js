const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const favoriteSchema = new Schema({
    favorite_id: ObjectId,
    user_id: { type: ObjectId, ref: "user" },
    tour_id: { type: ObjectId, ref: "tour" },
});
module.exports =
  mongoose.models.account || mongoose.model("favorite", favoriteSchema);