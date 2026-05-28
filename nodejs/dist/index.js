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
        const { data } = await this.client.post('transactions/transfer', params);
        return data;
    }
    async spend(params) {
        const { data } = await this.client.post('transactions/spend', params);
        return data;
    }
    async add(params) {
        const { data } = await this.client.post('transactions/add', params);
        return data;
    }
    async batch(params) {
        const { data } = await this.client.post('transactions/batch', params);
        return data;
    }
    // ==================== BALANCE ====================
    /**
     * Retrieves the complete balance of a player
     */
    async getBalance(userId) {
        try {
            const { data } = await this.client.get(`transactions/balance/${userId}`);
            return data.data || {};
        }
        catch (err) {
            console.error(`Failed to get balance for ${userId}:`, err.message);
            throw err;
        }
    }
    /**
     * Retrieves only a specific currency
     */
    async getBalanceByCurrency(userId, currency) {
        const balance = await this.getBalance(userId);
        return balance[currency] || 0;
    }
    // ==================== PAYMENT ====================
    async createPayment(params) {
        const { data } = await this.client.post('transactions/webhook/stripe', params);
        return data;
    }
    // ==================== ACTIONS ====================
    async loot(params) {
        const { data } = await this.client.post('actions/loot', params);
        return data;
    }
    async market(params) {
        const { data } = await this.client.post('actions/market', params);
        return data;
    }
    async craft(params) {
        const { data } = await this.client.post('actions/craft', params);
        return data;
    }
    async stamina(params) {
        const { data } = await this.client.post('actions/stamina', params);
        return data;
    }
    // ==================== TELEMETRY ====================
    async telemetry(params) {
        const { data } = await this.client.post('actions/telemetry', params);
        return data;
    }
    async setClickData(params) {
        const { data } = await this.client.post('actions/set-click-data', params);
        return data;
    }
    // ==================== LEDGER ====================
    async getUserLedgerHistory(userId) {
        const { data } = await this.client.get(`actions/ledger/${userId}`);
        return data;
    }
}
exports.VeloxTx = VeloxTx;
exports.default = VeloxTx;
