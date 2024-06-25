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
exports.Logs = void 0;
class Logs {
    constructor(etherScan) {
        this.etherScan = etherScan;
    }
    /**
     * Get Event Logs by Address
     * @param {string} address the address to check for logs
     * @param {number} options.fromBlock The block number to start searching for logs e.g. `12878196`.
     * @param {number} options.toBlock The block number to stop searching for logs e.g. `12879196`.
     * @param {number} options.page Page number, if pagination is enabled.
     * @param {number} options.offset The number of transactions displayed per page. Limited to 1000 records per query, use the `page` parameter for subsequent records.
     * @returns {Promise<LogResponse>} Returns the event logs from an address, with optional filtering by block range.
     */
    getLogsByAddress(address_1) {
        return __awaiter(this, arguments, void 0, function* (address, options = {}) {
            const url = this.etherScan.constructUrl('logs', 'getLogs', Object.assign({ address }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Event Logs by Topics
     *
     * For a single topic, specify the topic number such as `topic0`, `topic1`, `topic2`, `topic3`
     *
     * For multiple topics, specify the topic numbers and topic operator either `and` or `or` such as below
     * * `topic0_1_opr` (and|or between topic0 & topic1),
     * * `topic0_2_opr` (and|or between topic0 & topic2),
     * * `topic0_3_opr` (and|or between topic0 & topic3),
     * * `topic1_2_opr` (and|or between topic1 & topic2),
     * * `topic1_3_opr` (and|or between topic1 & topic3)
     * * `topic2_3_opr` (and|or between topic2 & topic3),
     *
     * @param {number} options.fromBlock The block number to start searching for logs e.g. `12878196`.
     * @param {number} options.toBlock The block number to stop searching for logs e.g. `12879196`.
     * @param {number} options.topic0 The topic numbers to search for.
     * @param {number} options.topic0_1_opr The topic operator when multiple `topic0` and `topic1` are used.
     * @param {number} options.topic0_2_opr The topic operator when multiple `topic0` and `topic2` are used.
     * @param {number} options.topic0_3_opr The topic operator when multiple `topic0` and `topic3` are used.
     * @param {number} options.topic1 The topic numbers to search for.
     * @param {number} options.topic1_2_opr The topic operator when multiple `topic1` and `topic2` are used.
     * @param {number} options.topic1_3_opr The topic operator when multiple `topic1` and `topic3` are used.
     * @param {number} options.topic2 The topic numbers to search for.
     * @param {number} options.topic2_3_opr The topic operator when multiple `topic2` and `topic3` are used.
     * @param {number} options.topic3 The topic numbers to search for.
     * @param {number} options.page Page number, if pagination is enabled.
     * @param {number} options.offset The number of transactions displayed per page. Limited to 1000 records per query, use the `page` parameter for subsequent records.
     * @returns {Promise<LogResponse>} Returns the events log in a block range, filtered by topics.
     */
    getLogsByTopics() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            const url = this.etherScan.constructUrl('logs', 'getLogs', Object.assign({}, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Event Logs by Address filtered by Topics
     *
     * For a single topic, specify the topic number such as `topic0`, `topic1`, `topic2`, `topic3`
     *
     * For multiple topics, specify the topic numbers and topic operator either `and` or `or` such as below
     * * `topic0_1_opr` (and|or between topic0 & topic1),
     * * `topic0_2_opr` (and|or between topic0 & topic2),
     * * `topic0_3_opr` (and|or between topic0 & topic3),
     * * `topic1_2_opr` (and|or between topic1 & topic2),
     * * `topic1_3_opr` (and|or between topic1 & topic3)
     * * `topic2_3_opr` (and|or between topic2 & topic3),
     *
     * @param {string} address the address to check for logs
     * @param {number} options.fromBlock The block number to start searching for logs e.g. `12878196`.
     * @param {number} options.toBlock The block number to stop searching for logs e.g. `12879196`.
     * @param {number} options.topic0 The topic numbers to search for.
     * @param {number} options.topic0_1_opr The topic operator when multiple `topic0` and `topic1` are used.
     * @param {number} options.topic0_2_opr The topic operator when multiple `topic0` and `topic2` are used.
     * @param {number} options.topic0_3_opr The topic operator when multiple `topic0` and `topic3` are used.
     * @param {number} options.topic1 The topic numbers to search for.
     * @param {number} options.topic1_2_opr The topic operator when multiple `topic1` and `topic2` are used.
     * @param {number} options.topic1_3_opr The topic operator when multiple `topic1` and `topic3` are used.
     * @param {number} options.topic2 The topic numbers to search for.
     * @param {number} options.topic2_3_opr The topic operator when multiple `topic2` and `topic3` are used.
     * @param {number} options.topic3 The topic numbers to search for.
     * @param {number} options.page Page number, if pagination is enabled.
     * @param {number} options.offset The number of transactions displayed per page. Limited to 1000 records per query, use the `page` parameter for subsequent records.
     * @returns {Promise<LogResponse>} Returns the event logs from an address, filtered by topics and block range.
     */
    getLogsByAddressAndTopics(address_1) {
        return __awaiter(this, arguments, void 0, function* (address, options = {}) {
            const url = this.etherScan.constructUrl('logs', 'getLogs', Object.assign({ address }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
}
exports.Logs = Logs;
