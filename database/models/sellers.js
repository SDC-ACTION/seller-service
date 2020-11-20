const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  returnPolicy: String,
  delivery: {
    free: String,
    minimumPurchase: Number,
    days: Number,
    fee: Number,
  },
});

const Seller = mongoose.model('Seller', sellerSchema);

const create = (seller) => {
  const newSeller = new Seller(seller);
  return newSeller.save();
};

const get = (sellerId) => Seller.find({ id: sellerId });

const remove = (sellerId) => Seller.deleteMany({ id: sellerId });

const update = (seller) => Seller.findOneAndUpdate(
  {
    id: seller.id,
  }, {
    name: seller.name,
    returnPolicy: seller.returnPolicy,
    delivery: seller.delivery,
  },
);

const retrieveSellers = () => Seller.find()
  .limit()
  .sort({ productId: 1 });

module.exports = {
  Seller,
  retrieveSellers,
  create,
  get,
  update,
  remove,
};
