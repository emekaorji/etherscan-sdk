"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(etherScan) {
        this.etherScan = etherScan;
    }
    /**
     * Get Ether Balance for a Single or Multiple Address in a Single Call
     * @param {string} address the addresses to check for balance
     * @param {string} options.tag the string pre-defined block parameter, either `earliest`, `pending` or `latest`
     * @returns Returns the Ether balance of the given address(es).
     */
    getBalance(address_1) {
        return __awaiter(this, arguments, void 0, function* (address, { tag } = {}) {
            let _address;
            let action;
            if (Array.isArray(address)) {
                _address = address.join(',');
                action = 'balancemulti';
            }
            else {
                _address = address;
                action = 'balance';
            }
            const url = this.etherScan.constructUrl('account', action, {
                address: _address,
                tag,
            });
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get a list of 'Normal' Transactions By Address
     * @param {string} address the addresses to check for balance
     * @param {number} options.startBlock block number to start searching for transactions
     * @param {number} options.endBlock block number to stop searching for transactions
     * @param {number} options.page page number, if pagination is enabled
     * @param {number} options.offset the number of transactions displayed per page
     * @param {string} options.sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descendin. Tip: Specify a smaller startBlock and endBlock range for faster search results.
     * @returns Returns the list of transactions performed by an address, with optional pagination.
     */
    getNormalTransactions(address_1) {
        return __awaiter(this, arguments, void 0, function* (address, options = {}) {
            const url = this.etherScan.constructUrl('account', 'txlist', Object.assign({ address }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get a list of 'Internal' Transactions by Address
     * @param {string} address the addresses to check for balance
     * @param {number} options.startBlock block number to start searching for transactions
     * @param {number} options.endBlock block number to stop searching for transactions
     * @param {number} options.page page number, if pagination is enabled
     * @param {number} options.offset the number of transactions displayed per page
     * @param {string} options.sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descendin. Tip: Specify a smaller startBlock and endBlock range for faster search results.
     * @returns Returns the list of transactions performed by an address, with optional pagination.
     */
    getInternalTransactions(address_1) {
        return __awaiter(this, arguments, void 0, function* (address, options = {}) {
            const url = this.etherScan.constructUrl('account', 'txlistinternal', Object.assign({ address }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get 'Internal Transactions' by Transaction Hash
     * @param {string} txHash the string representing the transaction hash to check for internal transactions
     * @returns Returns the list of internal transactions performed within a transaction.
     */
    getInternalTransactionsByHash(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('account', 'txlistinternal', {
                txHash,
            });
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get "Internal Transactions" by Block Range
     * @param {number} options.startBlock block number to start searching for transactions
     * @param {number} options.endBlock block number to stop searching for transactions
     * @param {number} options.page page number, if pagination is enabled
     * @param {number} options.offset the number of transactions displayed per page
     * @param {string} options.sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descendin. Tip: Specify a smaller startBlock and endBlock range for faster search results.
     * @returns Returns the list of internal transactions performed within a block range, with optional pagination.
     */
    getInternalTransactionsByBlockRange() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            const url = this.etherScan.constructUrl('account', 'txlistinternal', Object.assign({}, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get a list of 'ERC20 - Token Transfer Events' by Address
     * @param {string} address the address to check for balance
     * @param {string} contractAddress the token contract address to check for balance
     * @param {number} options.startBlock block number to start searching for transactions
     * @param {number} options.endBlock block number to stop searching for transactions
     * @param {number} options.page page number, if pagination is enabled
     * @param {number} options.offset the number of transactions displayed per page
     * @param {string} options.sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descendin. Tip: Specify a smaller startBlock and endBlock range for faster search results.
     * @returns Returns the list of ERC-20 tokens transferred by an address, with optional filtering by token contract.
     */
    getERC20TokenEvents(address_1, contractAddress_1) {
        return __awaiter(this, arguments, void 0, function* (address, contractAddress, options = {}) {
            const url = this.etherScan.constructUrl('account', 'tokentx', Object.assign({ address,
                contractAddress }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get a list of 'ERC721 - Token Transfer Events' by Address
     * @param {string} address the address to check for balance
     * @param {string} contractAddress the token contract address to check for balance
     * @param {number} options.startBlock block number to start searching for transactions
     * @param {number} options.endBlock block number to stop searching for transactions
     * @param {number} options.page page number, if pagination is enabled
     * @param {number} options.offset the number of transactions displayed per page
     * @param {string} options.sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descendin. Tip: Specify a smaller startBlock and endBlock range for faster search results.
     * @returns Returns the list of ERC-721 ( NFT ) tokens transferred by an address, with optional filtering by token contract.
     */
    getERC721TokenEvents(address_1, contractAddress_1) {
        return __awaiter(this, arguments, void 0, function* (address, contractAddress, options = {}) {
            const url = this.etherScan.constructUrl('account', 'tokennfttx', Object.assign({ address,
                contractAddress }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get a list of 'ERC1155 - Token Transfer Events' by Address
     * @param {string} address the address to check for balance
     * @param {string} contractAddress the token contract address to check for balance
     * @param {number} options.startBlock block number to start searching for transactions
     * @param {number} options.endBlock block number to stop searching for transactions
     * @param {number} options.page page number, if pagination is enabled
     * @param {number} options.offset the number of transactions displayed per page
     * @param {string} options.sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descendin. Tip: Specify a smaller startBlock and endBlock range for faster search results.
     * @returns Returns the list of ERC-1155 ( Multi Token Standard ) tokens transferred by an address, with optional filtering by token contract.
     */
    getERC1155TokenEvents(address_1, contractAddress_1) {
        return __awaiter(this, arguments, void 0, function* (address, contractAddress, options = {}) {
            const url = this.etherScan.constructUrl('account', 'token1155tx', Object.assign({ address,
                contractAddress }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get list of Blocks Validated by Address
     * @param {string} address the address to check for balance
     * @param {string} blockType the pre-defined block type, either `blocks` for canonical blocks or `uncles` for uncle blocks only
     * @param {number} options.page page number, if pagination is enabled
     * @param {number} options.offset the number of transactions displayed per page
     * @returns Returns the list of blocks validated by an address.
     */
    getValidatedBlocks(address_1, blockType_1) {
        return __awaiter(this, arguments, void 0, function* (address, blockType, options = {}) {
            const url = this.etherScan.constructUrl('account', 'getminedblocks', Object.assign({ address,
                blockType }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Beacon Chain Withdrawals by Address and Block Range
     * @param {string} address the address to check for balance
     * @param {number} options.startBlock block number to start searching for transactions
     * @param {number} options.endBlock block number to stop searching for transactions
     * @param {number} options.page page number, if pagination is enabled
     * @param {number} options.offset the number of transactions displayed per page
     * @param {string} options.sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descendin. Tip: Specify a smaller startBlock and endBlock range for faster search results.
     * @returns Returns the beacon chain withdrawals made to an address.
     */
    getBeaconChainWithdrawals(address_1) {
        return __awaiter(this, arguments, void 0, function* (address, options = {}) {
            const url = this.etherScan.constructUrl('account', 'txsBeaconWithdrawal', Object.assign({ address }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Historical Ether Balance for a Single Address By BlockNo (PRO Tier Only)
     * @param {string} address the address to check for balance
     * @param {number} blockNo block number to check balance for e.g. `12697906`
     * @returns Returns the beacon chain withdrawals made to an address.
     */
    getHistoricalBalance(address, blockNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('account', 'balancehistory', {
                address,
                blockNo,
            });
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
}
exports.Account = Account;
