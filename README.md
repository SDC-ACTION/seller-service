# Project Name

> Seller Service


## Usage

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

