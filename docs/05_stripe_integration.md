# Stripe Integration & Fiat Metadata

This module processes real-world currency inflows via secure Webhooks, converting monetary transactions into logical in-game entitlements.

## Webhook Architecture
1. The client completes a payment on the Stripe Checkout Session.
2. Stripe sends a `checkout.session.completed` event asynchronously to our endpoint.
3. The server validates the cryptographic signature (`stripe-signature`) using the Webhook endpoint secret.
4. Complex metadata fields are extracted to handle the credit logic.

## Advanced Stripe Metadata Structure
To prevent *Price Manipulation Attacks* (where a malicious client alters the local shop price configuration), the backend performs a cross-validation between the actual amount paid and the expected metadata values sent during session creation.

```json
"metadata": {
  "userId": "player_123",
  "purchaseType": "bundle", 
  "catalogProductId": "season_4_battlepass",
  "expectedPriceCents": "9900",
  "entitlements": "skin_vanguard_01,boost_xp_7d,gems_500"
}
```
## Distribution Logic (Entitlements)
If purchaseType is set to currency, the server invokes the specific Lua script to increment the user's balance hash. If set to bundle, the server parses the comma-separated entitlements string and grants the items atomically to the player's inventory.