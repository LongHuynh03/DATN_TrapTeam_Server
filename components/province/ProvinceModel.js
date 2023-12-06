const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const provinceSchema = new Schema({
  province_id: ObjectId,
  name: String,
  image: String,
});

module.exports =
  mongoose.models.province || mongoose.model("province", provinceSchema);
