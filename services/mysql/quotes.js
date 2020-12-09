module.exports = {
  createQuotes: (data) => {
    if (!data) return null;

    const quotes = {};
    data.forEach((item) => {
      const taxAmount = (item.price * 0.12).toFixed(2);
      const total = (item.price * 1.12).toFixed(2);

      if (!quotes[item.id]) {
        quotes[item.id] = {
          productId: item.id,
          seller: [],
        };
      }

      quotes[item.id].seller.push({
        id: item.sellerid,
        price: item.price,
        tax: taxAmount.toString(),
        shippingFee: parseFloat(item.fee),
        totalPrice: total,
        returnPolicy: item.description,
        name: item.sellername,
        offer: `Delivered in ${item.days} days with a minimum purchase of ${item.min_amount.toFixed(2)}.`,
      });
    });

    return Object.values(quotes);
  },
};
