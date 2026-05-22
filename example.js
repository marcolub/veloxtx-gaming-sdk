const VeloxTx = require('./dist');   // dopo aver fatto build

const client = new VeloxTx({
  baseURL: 'http://localhost:3000',
  // apiKey: 'tuo-api-key-se-implementi-auth'
});

async function main() {
  // Transfer tra giocatori
  const transferResult = await client.transfer({
    fromUser: "player123",
    toUser: "player456",
    currency: "coins",
    amount: 1000,
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