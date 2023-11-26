const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    user: { type: ObjectId,  ref: 'use'},
    product: { type: ObjectId, ref: 'product' },
    quantity: { type: Number},
});
module.exports = mongoose.models.cart || mongoose.model('cart', schema);
// cart -----> carts