const data = require('./data');

const productCount = 100000;
const productSellerCount = 300000;
const sellerCount = 5000;

// product-seller

for (let i = 1; i <= productSellerCount; i++) {
  const product = {
    id: i,
    productId: Math.ceil(Math.random() * productCount),
    sellerId: Math.ceil(Math.random() * sellerCount),
    price: data.prices[Math.floor(Math.random() * data.prices.length)],
  };
}

// seller

const seller = {};
for (let i = 1; i <= sellerCount; i++) {
  seller.id = i;
  seller.name = data.sellers[Math.floor(Math.random() * data.sellers.length)];
  seller.policyId = data.returnPolicies[Math.ceil(Math.random() * data.returnPolicies.length)];
  seller.deliveryId = data.delivery[Math.ceil(Math.random() * data.delivery.length)];
}

// delivery option

for (let i = 1; i <= data.deliveryOptions.length; i++) {
  const deliveryOption = { id: i, ...data.deliveryOptions[i] };
}

// return policy

for (let i = 1; i <= data.returnPolicies.length; i++) {
  const returnPolicy = { id: i, ...data.returnPolicies[i] };
}
// tax

for (let i = 1; i <= data.stateTaxRates.length; i++) {
  const stateTaxRate = { id: i, ...data.stateTaxRatess[i] };
}
