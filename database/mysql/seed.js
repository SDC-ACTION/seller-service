/* eslint-disable no-plusplus */
const fs = require('fs');
const path = require('path');
const fake = require('./fake-data');
const fakeFn = require('./generator');

// folder for csv files
fs.mkdir(path.join(__dirname, '/data'), () => { });

// generic funciton that writes large data to stream
const writeToFile = (writer, encoding, getText, size, callback) => {
  let i = 1;
  function write() {
    let ok = true;
    do {
      const data = getText(i);
      if (i === size) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
      i += 1;
    } while (i <= size && ok);
    if (i <= size) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
  write();
};

// product-seller

const writeProductSeller = fs.createWriteStream('./data/product_seller.csv');
writeProductSeller.write('product_id, seller_id, price\n');
writeToFile(writeProductSeller, 'utf-8', fakeFn.getProductSeller, fake.productSellerCount, () => {
  writeProductSeller.end();
});

// seller

const writeSeller = fs.createWriteStream('./data/seller.csv');
writeSeller.write('id, name, return_policy_id, delivery_id\n');
writeToFile(writeSeller, 'utf-8', fakeFn.getSeller, fake.productCount, () => {
  writeSeller.end();
});

// delivery option
const writeDeliveryOption = fs.createWriteStream('./data/delivery_option.csv');
writeDeliveryOption.write('id, fee, min_amount, days\n');
writeToFile(writeDeliveryOption, 'utf-8', fakeFn.getDeliveryOption, fake.deliveryOptions.length, () => {
  writeDeliveryOption.end();
});

// return policy
const writeReturnPolicy = fs.createWriteStream('./data/return_policy.csv');
writeReturnPolicy.write('id, description\n');
writeToFile(writeReturnPolicy, 'utf-8', fakeFn.getReturnPolicy, fake.returnPolicies.length, () => {
  writeReturnPolicy.end();
});

// tax
const writeTax = fs.createWriteStream('./data/state_tax.csv');
writeTax.write('state, combined_rate\n');
writeToFile(writeTax, 'utf-8', fakeFn.getTax, fake.stateTaxRates.length, () => {
  writeTax.end();
});
