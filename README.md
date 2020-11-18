# Project Name

> Seller Service

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> POST /api/seller
  body
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
> GET /api/seller/:sellerId
> PUT /api/seller
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
> DEL /api/seller/:sellerId


## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

