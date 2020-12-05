const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const priceSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  seller: [{
    id: Number,
    price: Number,
    tax: Number,
  }],
});

const Price = mongoose.model('Price', priceSchema);

const retrievePrices = (id) => {
  if (id) {
    return Price.find({ productId: id })
      .sort({ productId: 1 });
  }
  return Price.find()
    .sort({ productId: 1 });
};

module.exports = {
  Price,
  retrievePrices,
};
