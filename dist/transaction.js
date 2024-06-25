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
exports.Contract = void 0;
class Contract {
    constructor(etherScan) {
        this.etherScan = etherScan;
    }
    /**
     * Check Contract Execution Status
     * @param {string} txHash the transaction hash to check the execution status
     * @returns Returns the status code of a contract execution.
     */
    checkExecutionStatus(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('transaction', 'getstatus', {
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
     * Check Transaction Receipt Status
     *
     * **Only applicable for post Byzantium Fork transactions.**
     *
     * @param {string} txHash the transaction hash to check the execution status
     * @returns Returns the status code of a transaction execution.
     */
    checkTXReceiptStatus(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('transaction', 'gettxreceiptstatus', { txHash });
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
}
exports.Contract = Contract;
