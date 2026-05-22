# Complete API Reference

All requests hitting the VeloxTx ecosystem must include the `Content-Type: application/json` header (except for the raw Stripe incoming webhook endpoint).

## Transactions & Balances Module

### Get Player Balance
- **URL**: `/api/v1/transactions/balance/:userId`
- **Method**: `GET`
- **Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "gems": 1500,
    "gold": 45000
  },
  "message": "Balance retrieved successfully"
}
```

Stripe Webhook Receiver
URL: /api/v1/transactions/webhook

Method: POST

Required Header: stripe-signature: <signature_key>

Native Game Actions Module
Open Lootbox (SPEND_AND_DROP)
URL: /api/v1/actions/loot

Method: POST

Body: {"userId": "string", "boxId": "string"}

Buy Market Item (P2P_MARKET_EXECUTE)
URL: /api/v1/actions/market/buy

Method: POST

Body:

JSON
{
  "buyerId": "string",
  "listingId": "string",
  "sellerId": "string",
  "itemId": "string",
  "price": 5000
}
Craft Item (CRAFT_ITEM)
URL: /api/v1/actions/craft

Method: POST

Body: {"userId": "string", "recipeId": "string"}

Consume Stamina (CONSUME_STAMINA)
URL: /api/v1/actions/dungeon/enter

Method: POST

Body: {"userId": "string", "activityId": "string", "clientFps": 60, "lastClickTimestamp": 1716410425000}

Fetch Ledger History
URL: /api/v1/actions/ledger/:userId

Method: GET