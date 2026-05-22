# Dynamic Systems: Crafting & Stamina Consumption

Documentation regarding anti-bot energy depletion mechanics and item synthesis.

## 1. Item Crafting (`CRAFT_ITEM`)
Allows players to consume raw materials to forge new gear, acting as a deflationary sink for items within the game economy.

### Zod Schema
```javascript
payload: { 
  recipeId: z.string(), 
  outcome: z.enum(['SUCCESS', 'FAIL']) 
},
metadata: { 
  criticalHitChance: z.number() 
}
```

2. Stamina Consumption (CONSUME_STAMINA)A native rate-limiting mechanic designed to slow down repetitive actions and catch automation software or third-party macros (Bots).Zod Schema & Control MetadataJavaScriptpayload: { 
  activityId: z.string(), 
  cost: z.number().int().positive() 
},
metadata: { 
  clientFps: z.number(), 
  clickIntervalMs: z.number() 
}
Anti-Cheat LogicsEvery dungeon entry updates the last_action_time field within the user's hash on Valkey. By calculating the time delta on the backend, if clickIntervalMs exhibits a variance of less than $\pm5\text{ms}$ over 20 consecutive iterations, the account is automatically flagged as a flagged_bot within the global Ledger history metadata.