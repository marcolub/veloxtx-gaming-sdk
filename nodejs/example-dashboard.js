import { VeloxTx } from './dist/index.js';

// Lo sviluppatore inizializza l'SDK con l'UNICA chiave ricevuta dalla Dashboard SaaS!
const velox = new VeloxTx({
    baseURL: 'http://127.0.0.1:3000', // Parla con il Core Engine
    apiKey: 'vkx_live_472adf081e0a0b178108fb4269f1408d260fb685fcc370d9'
});

async function run() {
    // Il Core Engine riceve la chiave 'vkx_live...', la valida tramite Valkey,
    // esegue l'azione e scrive lo stream user:ledger:user1
    await velox.spend({
        userId: 'user1',
        currency: 'GOLD',
        amount: 10,
        txId: 'tx-100000001'
    });

    console.log("🔥 Transazione inviata usando l'API Key unificata del SaaS!");
}
run();