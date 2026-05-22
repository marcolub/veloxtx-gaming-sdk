# VeloxTx Gaming SDK - Architecture Overview

The VeloxTx Gaming module is a high-performance transactional engine powered by **Valkey** (in-memory RAM data store) and **Node.js (CommonJS)**. 

Its primary objective is to guarantee atomic consistency for the game state (currencies, inventory) while mitigating common gaming exploit vectors such as item duplication, client-side price manipulation, and botting/macro automation.

## Transactional Workflow
1. **Client Request**: The game client dispatches an action (e.g., purchasing an item).
2. **Lua Execution (Valkey)**: The Node.js backend delegates the state mutation to an atomic Lua script. If requirements fail (e.g., insufficient funds), the action is immediately rejected.
3. **Ledger Append**: Upon a successful Lua script execution, the action payload is validated via **Zod** and serialized in real-time into two high-speed streams (`XADD`).
4. **Client Response**: The client receives a success confirmation in `< 2ms`.

## High-Speed Ledger (Valkey Streams)
Every native in-game action generates an immutable historical log across two distinct channels:
- `user:ledger:<userId>`: A personal user event log (capped at 1000 events via `XTRIM`) used for customer support auditing and fast rollbacks.
- `analytics:global:ledger`: A unified global stream designed for external Analytics microservices and asynchronous data synchronization to relational databases (PostgreSQL/MySQL).

### Log Data Structure (Stream Fields)
- `action`: The discriminated operation type string.
- `payload`: Core operational data (item IDs, costs, quantities) serialized as a JSON string.
- `metadata`: Operational context (cryptographic seeds, client-side metrics, marketing tracking tags) serialized as a JSON string.
- `timestamp`: The Unix epoch millisecond timestamp of the event.