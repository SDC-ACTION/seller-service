module.exports = {
  productCount: 10,
  productSellerCount: 30,
  sellerCount: 3,
  prices: [9.99, 19.99, 29.99, 39.99, 49.99, 59.99, 99.99],
  sellers: [
    'Tortor City Centre',
    'Whistler Village',
    'Willmond',
    'V Bay',
    'Super Mind',
    'Designer Den ',
    'Ultricies',
    'Morbi Lake Mall',
    'Odio South Centre',
    'Pacific Arcade',
  ],
  delivery: [1, 3, 7],
  deliveryOptions: [
    {
      fee: 0, minPurchase: 200.00, days: 7,
    },
    {
      fee: 9.99, minPurchase: 100.00, days: 7,
    },
    {
      fee: 14.99, minPurchase: 0.00, days: 7,
    },
    {
      fee: 19.99, minPurchase: 100.00, days: 3,
    },
    {
      fee: 19.99, minPurchase: 200.00, days: 1,
    },
  ],
  returnPolicies: [
    'To return your product for refund, you will be responsible for paying for your own shippping costs.  Shipping costs are non-refundable.  If you are shipping an item oer $50, you should consider purchasing shipping insurance.  We don\'t guarantee that we will receive your returned item',
    'Return eligible within 30 days.',
    'No returns allowed on any FINAL SALE items, except for found workmanship flaws.  In the event that you are not satisfied with the product, we accept returns within 15 days if it is in a salable condition.',
  ],
  stateTaxRates: [
    {
      state: 'Alabama',
      rate: 7.50,
    },
    {
      state: 'Arizona',
      rate: 5.60,
    },
    {
      state: 'California',
      rate: 2.50,
    },
    {
      state: 'Connecticut',
      rate: 0.0,
    },
    {
      state: 'Florida',
      rate: 2.50,
    },
    {
      state: 'Hawaii',
      rate: 0.50,
    },
    {
      state: 'Illinois',
      rate: 10.00,
    },
    {
      state: 'Washington',
      rate: 4.00,
    },
  ],

};
