const {VeloxTx} = require('./dist');

const client = new VeloxTx({
  baseURL: 'http://159.89.200.77:3000',
  apiKey: 'vkx_gaming_sk_live_1234567890abcdef'
});

async function main() {
  // Transfer tra giocatori
  const transferResult = await client.transfer({
    fromUser: "player456",
    toUser: "player123",
    currency: "gems",
    amount: 1,
    txId: "tx-demo-001",
    feeRate: 1,
    metadata: { source: "trade", item: "sword" }
  });

  console.log(transferResult);

  // Reward
  await client.add({
    userId: "player789",
    currency: "gems",
    amount: 50,
    txId: "reward-001",
    reason: "daily_login"
  });
}

main();