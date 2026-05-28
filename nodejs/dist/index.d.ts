export interface VeloxTxConfig {
    baseURL: string;
    apiKey?: string;
    timeout?: number;
}
export interface TransactionResponse {
    success: boolean;
    message: string;
    data?: any;
}
export declare class VeloxTx {
    private client;
    constructor(config: VeloxTxConfig);
    transfer(params: {
        fromUser: string;
        toUser: string;
        currency: string;
        amount: number;
        txId: string;
        feeRate?: number;
        metadata?: Record<string, any>;
    }): Promise<TransactionResponse>;
    spend(params: {
        userId: string;
        currency: string;
        amount: number;
        txId: string;
        reason?: string;
    }): Promise<TransactionResponse>;
    add(params: {
        userId: string;
        currency: string;
        amount: number;
        txId: string;
        reason?: string;
    }): Promise<TransactionResponse>;
    batch(params: {
        userId: string;
        txId: string;
        operations: Array<{
            currency: string;
            amount: number;
        }>;
        reason?: string;
    }): Promise<TransactionResponse>;
    /**
     * Retrieves the complete balance of a player
     */
    getBalance(userId: string): Promise<Record<string, number>>;
    /**
     * Retrieves only a specific currency
     */
    getBalanceByCurrency(userId: string, currency: string): Promise<number>;
    createPayment(params: {
        userId: string;
        currency: string;
        amount: number;
        txId: string;
        reason?: string;
    }): Promise<TransactionResponse>;
    loot(params: {
        userId: string;
        boxId: string;
    }): Promise<TransactionResponse>;
    market(params: {
        buyerId: string;
        listingId: string;
        sellerId: string;
        itemId: string;
        price: number;
    }): Promise<TransactionResponse>;
    craft(params: {
        userId: string;
        recipeId: string;
    }): Promise<TransactionResponse>;
    stamina(params: {
        userId: string;
        activityId: string;
        clientFps: number;
        lastClickTimestamp?: number;
    }): Promise<TransactionResponse>;
    telemetry(params: {
        userId: string;
        clientId: string;
        clickIntervalMs: number;
        clientFps: number;
        clientOs: string;
        serverTimestamp: number;
        clientSalt: string;
    }): Promise<TransactionResponse>;
    setClickData(params: {
        userId: string;
        clickIntervalMs: number;
        clientFps: number;
    }): Promise<TransactionResponse>;
    getUserLedgerHistory(userId: string): Promise<TransactionResponse>;
}
export default VeloxTx;
