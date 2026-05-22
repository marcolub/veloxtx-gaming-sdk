# Player-to-Player Marketplace (`P2P_MARKET_EXECUTE`)

Handles Auction House operations or asynchronous P2P trading securely to eliminate item duplication exploits.

## Endpoint
- **URL**: `/api/v1/actions/market/buy`
- **Method**: `POST`

## Validation Schema (Zod Payload)
```javascript
payload: { 
  listingId: z.string(), 
  buyerId: z.string(), 
  sellerId: z.string(), 
  itemId: z.string(), 
  price: z.number().int().positive() 
},
metadata: { 
  taxBracket: z.string() 
}
```
## Atomicity and Automatic Rollbacks
The entire economic transaction takes place inside a single Lua operation on Valkey, which locks the involved keys sequentially:

Verifies the item exists inside user:inventory:<sellerId>.

Verifies that user:balance:<buyerId> covers the listing price.

Deducts the total currency from the buyer.

Applies the in-game tax rate (taxBracket), keeping it as an economic sink.

Credits the net amount to the seller and swaps the item ownership across the respective inventory Sets.

If any single step fails, Valkey executes an instantaneous automatic rollback.