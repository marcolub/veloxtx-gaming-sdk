# VeloxTX Gaming SDK 🎮⚡

An authoritative, zero-trust server-side SDK built for high-performance multiplayer online games. Engineered with **Node.js** and **Valkey (Redis)** to handle resource consumption, state synchronization, and aggressive anti-cheat detection entirely at the memory layer.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Node version](https://img.shields.io/badge/node-%3E%3D%2022.0.0-green)
![Valkey](https://img.shields.io/badge/database-Valkey%20%2F%20Redis-red)

---

## 🚀 The Architecture Challenge

In multiplayer games, relying on client-side data validation is an open invitation to exploits, race conditions, and infinite-resource glitches. Moving logic server-side often introduces a heavy bottleneck: **latency**.

**VeloxTX** solves this by shifting state mutations, payload validations, and macro-bot mitigation directly into atomic **Valkey Lua scripts**. The core database is touched only when transactions are clean, shielding your database cluster from spam and reducing infrastructure scaling costs.

---

## ⚡ Performance & Benchmarks

Tested under high concurrency stress using **Autocannon** (50 concurrent connections, 800 total requests targeting resource/stamina depletion endpoints).

* **Average Latency:** `6.73 ms`
* **Worst Case (Max Latency):** `30 ms`
* **Standard Deviation:** `4.18 ms` (Rock-solid stability)
* **Throughput:** `50 req/sec` flat
* **Anti-Cheat Mitigation Speed:** Repels bot-clickers with a `403 Forbidden` in **< 1.5 ms** (dropping down to `0.9 ms` on sequential blocks).

### Live Terminal Benchmark Report
> 💡 *Note: The server isn't just passing data—it executes full Zod validation, atomic Lua resource subtraction, and interval deviation logic on every hit.*

*(Insert your Autocannon terminal screenshot here by uploading it to your repo, e.g., `![Autocannon Benchmark](./benchmark-results.png)`)*

---

## 🛡️ Core Security Features

1. **Zero-Trust Client Design:** 100% of the game logic is evaluated server-side.
2. **Atomic State Mutations:** Resource consumption (e.g., Stamina/Energy) utilizes Redis/Valkey atomic operations to prevent race conditions and item-duplication exploits.
3. **Real-Time Bot Streak Anti-Cheat:** Calculates micro-interval click deviations mathematically on every packet. If it detects a perfect, millisecond-precise macro stream ($\lvert \Delta t \rvert \le 4\text{ms}$ over a specific threshold), the user is permanently flagged.
4. **Instant Memory-Lockdown:** Once a bot flag is triggered, the SDK bypasses regular logic routes and immediately returns a `403 Forbidden` in under 1ms, protecting database connections and CPU cycles.
5. **Secure Asynchronous Ledger:** Legitimate transactions are instantly written to an append-only secure ledger, ensuring data persistence without blocking the main event loop.

---

## 📦 Quick Start

### Installation

```bash
npm install veloxtx-gaming-sdk
```