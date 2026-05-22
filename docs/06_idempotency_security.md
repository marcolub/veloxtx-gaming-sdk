# Security, Idempotency & Rate Limiting

VeloxTx implements a "Zero Trust" approach regarding incoming data sent by the game client, utilizing Valkey as a distributed protective barrier.

## 1. Anti-Replay Protection (Payment Idempotency)
To prevent a user from resending the same Stripe webhook twice (or network glitches from duplicating currency distribution), every transaction ID is recorded temporarily.

- **Valkey Key**: `payments:processed` (Set)
- **Lua Flow**: Prior to running any financial ledger operations, the script runs `SISMEMBER payments:processed <stripe_tx_id>`. If it evaluates to `1`, the operation halts immediately, returning a duplicate transaction error.

## 2. Rate Limiter Configuration
The engine enforces tiered protective barriers using `express-rate-limit` based on endpoint sensitivity:

| Limiter Category | Targeted Endpoints | Time Window | Max Requests | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **General Limiter** | `/health`, `/api/v1/actions/ledger/*` | 15 Minutes | 100 | DDoS and scraping prevention |
| **Transaction Limiter** | `/api/v1/transactions/*`, `/api/v1/actions/*`| 1 Minute | 5 | Brute-force and spam bot blocking |

## 3. Anti-Cheat Price Validations
Every fiat transaction is checked using the following logical equation in the Express controller prior to hitting Valkey:

$$\text{StripeAmountCents} \ge \text{Metadata.expectedPriceCents}$$

If this condition is violated, the execution drops, the transaction is marked as `FRAUD_SUSPECT` in the global ledger, and a security alert is triggered automatically.