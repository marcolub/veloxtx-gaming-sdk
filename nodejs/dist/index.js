"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloxTx = void 0;
const axios_1 = __importDefault(require("axios"));
class VeloxTx {
    client;
    constructor(config) {
        this.client = axios_1.default.create({
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
    async transfer(params) {
        const { data } = await this.client.post('/transactions/transfer', params);
        return data;
    }
    async spend(params) {
        const { data } = await this.client.post('/transactions/spend', params);
        return data;
    }
    async add(params) {
        const { data } = await this.client.post('/transactions/add', params);
        return data;
    }
    async batch(params) {
        const { data } = await this.client.post('/transactions/batch', params);
        return data;
    }
    // ==================== BALANCE ====================
    /**
     * Recupera il balance completo di un giocatore
     */
    async getBalance(userId) {
        try {
            const { data } = await this.client.get(`/transactions/balance/${userId}`);
            return data.data || {};
        }
        catch (err) {
            console.error(`Failed to get balance for ${userId}:`, err.message);
            throw err;
        }
    }
    /**
     * Recupera solo una valuta specifica
     */
    async getBalanceByCurrency(userId, currency) {
        const balance = await this.getBalance(userId);
        return balance[currency] || 0;
    }
}
exports.VeloxTx = VeloxTx;
exports.default = VeloxTx;
