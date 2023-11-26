const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    _id: { type: ObjectId }, // khóa chính
    Email: { type: String},
    Phone: { type: String},
    Favorite: { type: Number},
    Password: { type: String},
    Avatar: { type: String},
    Gender: { type: String},
    CreateAt: { type: String},
    Name: { type: String},
});
module.exports = mongoose.models.users || mongoose.model('user', schema);
// cart -----> carts