const fake = require('./fake-data');

module.exports = {
  getProductSeller: () => {
    const productId = Math.ceil(Math.random() * fake.productCount);
    const sellerId = Math.ceil(Math.random() * fake.sellerCount);
    const price = fake.prices[Math.floor(Math.random() * fake.prices.length)];
    return `"${productId}","${sellerId}","${price}"\n`;
  },
  getSeller: (i) => {
    const id = i;
    const name = fake.sellers[Math.floor(Math.random() * fake.sellers.length)];
    const policyId = Math.ceil(Math.random() * fake.returnPolicies.length);
    // eslint-disable-next-line max-len
    const deliveryId = Math.ceil(Math.random() * fake.deliveryOptions.length);
    return `"${id}","${name}","${policyId}","${deliveryId}"\n`;
  },
  getDeliveryOption: (index) => {
    const i = index - 1;
    return `"${index}","${fake.deliveryOptions[i].fee}","${fake.deliveryOptions[i].minPurchase}","${fake.deliveryOptions[i].days}"\n`;
  },
  getReturnPolicy: (index) => {
    const i = index - 1;
    return `"${index}","${fake.returnPolicies[i]}"\n`;
  },
  getTax: (index) => {
    const i = index - 1;
    return `"${fake.stateTaxRates[i].state}","${fake.stateTaxRates[i].rate}"\n`;
  },
};
