# Loot Box & Gacha System (`SPEND_AND_DROP`)

Documentation for opening in-game chests and distributing standardized randomized item drops.

## Endpoint
- **URL**: `/api/v1/actions/loot`
- **Method**: `POST`
- **Content-Type**: `application/json`

## Validation Schema (Zod Payload)
```javascript
payload: { 
  boxId: z.string(), 
  cost: z.number().int().positive(), 
  itemDropped: z.string() 
},
metadata: { 
  seed: z.string(), 
  source: z.string() 
}
```
## Logic Flow & Security Constraints
The random drop generation (RNG) algorithm must strictly execute on the Node.js server (or via verifiable deterministic cryptographic seeds) before invoking Valkey.

The Lua script atomically verifies that user:balance:<userId> contains enough currency to cover the cost, subtracts the funds, and pushes the itemDropped into the user:inventory:<userId> Set.

Request JSON Example
JSON
{
  "userId": "player123",
  "boxId": "cyber_punk_chest_04"
}