"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherScan = void 0;
const account_1 = require("./account");
const contract_1 = require("./contract");
class EtherScan {
    constructor({ apikey, network = 'mainnet' }) {
        // Define Private variables
        this.BASE_URL_MAINNET = 'https://api.etherscan.io/api';
        this.BASE_URL_SEPOLIA = 'https://api-sepolia.etherscan.io/api';
        this.BASE_URL_GOERLI = 'https://api-goerli.etherscan.io/api';
        // Throw an error if the API key is not provided
        if (!apikey) {
            throw new Error('API key is required');
        }
        this.API_KEY = apikey;
        this.network = network;
        this.account = new account_1.Account(this);
        this.contract = new contract_1.Contract(this);
    }
    getBaseUrl() {
        switch (this.network) {
            case 'mainnet':
                return this.BASE_URL_MAINNET;
            case 'sepolia':
                return this.BASE_URL_SEPOLIA;
            case 'goerli':
                return this.BASE_URL_GOERLI;
            default:
                return this.BASE_URL_MAINNET;
        }
    }
    constructUrl(module, action, params) {
        const uppercaseKeys = ['fromBlock', 'toBlock'];
        const baseUrl = this.getBaseUrl();
        const _params = Object.fromEntries(Object.entries(params).map(([key, value]) => [
            uppercaseKeys.includes(key) ? key : key.toLowerCase(),
            String(value),
        ]));
        const queryParams = new URLSearchParams(Object.assign(Object.assign({}, _params), { module,
            action, apikey: this.API_KEY })).toString();
        return `${baseUrl}?${queryParams}`;
    }
}
exports.EtherScan = EtherScan;
