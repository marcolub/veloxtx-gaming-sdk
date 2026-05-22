import axios, { AxiosInstance } from 'axios';

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

export class VeloxTx {
  private client: AxiosInstance;

  constructor(config: VeloxTxConfig) {
    this.client = axios.create({
      baseURL: config.baseURL.endsWith('/api/v1') 
        ? config.baseURL 
        : `${config.baseURL}/api/v1`,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
      }
    });
  }

  // ==================== TRANSACTIONS ====================

  async transfer(params: {
    fromUser: string;
    toUser: string;
    currency: string;
    amount: number;
    txId: string;
    feeRate?: number;
    metadata?: Record<string, any>;
  }): Promise<TransactionResponse> {
    const { data } = await this.client.post('/transactions/transfer', params);
    return data;
  }

  async spend(params: {
    userId: string;
    currency: string;
    amount: number;
    txId: string;
    reason?: string;
  }): Promise<TransactionResponse> {
    const { data } = await this.client.post('/transactions/spend', params);
    return data;
  }

  async add(params: {
    userId: string;
    currency: string;
    amount: number;
    txId: string;
    reason?: string;
  }): Promise<TransactionResponse> {
    const { data } = await this.client.post('/transactions/add', params);
    return data;
  }

  async batch(params: {
    userId: string;
    txId: string;
    operations: Array<{ currency: string; amount: number }>;
    reason?: string;
  }): Promise<TransactionResponse> {
    const { data } = await this.client.post('/transactions/batch', params);
    return data;
  }

  // ==================== BALANCE ====================

  /**
   * Recupera il balance completo di un giocatore
   */
  async getBalance(userId: string): Promise<Record<string, number>> {
    try {
      const { data } = await this.client.get(`/transactions/balance/${userId}`);
      return data.data || {};
    } catch (err: any) {
      console.error(`Failed to get balance for ${userId}:`, err.message);
      throw err;
    }
  }

  /**
   * Recupera solo una valuta specifica
   */
  async getBalanceByCurrency(userId: string, currency: string): Promise<number> {
    const balance = await this.getBalance(userId);
    return balance[currency] || 0;
  }
}

export default VeloxTx;