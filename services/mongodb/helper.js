/* eslint-disable no-plusplus */

const sellerName = (id, sellers) => {
  for (let i = 0; i < sellers.length; i++) {
    if (sellers[i].id === id) {
      return sellers[i].name;
    }
  }
  return '';
};

const sellerOffer = (id, sellers) => {
  const dayOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for (let i = 0; i < sellers.length; i++) {
    if (sellers[i].id === id) {
      const { delivery } = sellers[i];
      const deliveryDay = new Date();
      deliveryDay.setDate(deliveryDay.getDate() + delivery.days);
      if (delivery.free === 'True') {
        return `Free delivery by ${dayOfTheWeek[deliveryDay.getDay()]}, ${month[deliveryDay.getMonth()]} ${deliveryDay.getDate()}`;
      }
      return `Spend $${delivery.minimumPurchase} for free delivery by ${dayOfTheWeek[deliveryDay.getDay()]}, ${month[deliveryDay.getMonth()]} ${deliveryDay.getDate()}`;
    }
  }
  return '';
};

const sellerReturnPolicy = (id, sellers) => {
  for (let i = 0; i < sellers.length; i++) {
    if (sellers[i].id === id) {
      return sellers[i].returnPolicy;
    }
  }
  return '';
};

const sellerShippingFee = (id, sellers) => {
  for (let i = 0; i < sellers.length; i++) {
    const { delivery } = sellers[i];
    if (sellers[i].id === id) {
      return delivery.fee;
    }
  }
  return '';
};

module.exports = {
  sellerName,
  sellerOffer,
  sellerReturnPolicy,
  sellerShippingFee,
};
