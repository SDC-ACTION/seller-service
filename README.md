# Project Name

> Seller Product Quotes Service


## API
### GET /api/product/quotes
http://localhost:3002/api/product/quotes

### GET /api/product/sellers
http://localhost:3002/api/product/sellers

### GET /api/product/prices
http://localhost:3002/api/product/prices

### GET /api/product/prices/:productId
http://localhost:3002/api/product/prices/1001


### POST /api/seller
```  body
    {
      "seller": {
          "delivery": {
          "free": "True",
          "minimumPurchase": 0,
          "days": 2,
          "fee": 0
          },
          "id": 21,
          "name": "Mama",
          "returnPolicy": "Return-eligible for 60 days"
      }
    }
```
### GET /api/seller/:sellerId
http://localhost:3002/api/seller/1000

### PUT /api/seller
```
  body
    {
        "seller": {
            "delivery": {
            "free": "True",
            "minimumPurchase": 0,
            "days": 2,
            "fee": 0
            },
            "id": 20,
            "name": "Anabell",
            "returnPolicy": "Return-eligible for 60 days"
        }
    }
```
### DEL /api/seller/:sellerId
