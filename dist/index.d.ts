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
     * Recupera il balance completo di un giocatore
     */
    getBalance(userId: string): Promise<Record<string, number>>;
    /**
     * Recupera solo una valuta specifica
     */
    getBalanceByCurrency(userId: string, currency: string): Promise<number>;
}
export default VeloxTx;
