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
exports.Block = void 0;
class Block {
    constructor(etherScan) {
        this.etherScan = etherScan;
    }
    /**
     * Get Block And Uncle Rewards by BlockNo
     * @param {number} blockNo The block number to check block rewards for e.g. `12697906`
     * @returns Returns the block reward and 'Uncle' block rewards.
     */
    getBlockReward(blockNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('block', 'getblockreward', {
                blockNo,
            });
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Estimated Block Countdown Time by BlockNo
     * @param {number} blockNo The block number to estimate time remaining to be mined e.g. `12697906`
     * @returns Returns the estimated time remaining, in seconds, until a certain block is mined.
     */
    getBlockCountdown(blockNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('block', 'getblockcountdown', {
                blockNo,
            });
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Block Number by Timestamp
     * @param {number} timestamp The Unix timestamp in seconds
     * @param {string} options.closest The closest available block to the provided timestamp, either `before` or `after`
     * @returns Returns the block number that was mined at a certain timestamp.
     */
    getBlockNumberByTimestamp(timestamp_1) {
        return __awaiter(this, arguments, void 0, function* (timestamp, options = {}) {
            const url = this.etherScan.constructUrl('block', 'getblocknobytime', Object.assign({ timestamp }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Daily Average Block Size
     * @param {string} startDate The starting date in `yyyy-MM-dd` format e.g. 2019-02-01
     * @param {string} endDate The ending date in `yyyy-MM-dd` format e.g. 2019-02-28
     * @param {string} options.sort The sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
     * @returns Returns the daily average block size within a date range.
     */
    getDailyAvgBlockSize(startDate_1, endDate_1) {
        return __awaiter(this, arguments, void 0, function* (startDate, endDate, options = {}) {
            const url = this.etherScan.constructUrl('stats', 'dailyavgblocksize', Object.assign({ startDate,
                endDate }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Daily Block Count and Rewards
     * @param {string} startDate The starting date in `yyyy-MM-dd` format e.g. 2019-02-01
     * @param {string} endDate The ending date in `yyyy-MM-dd` format e.g. 2019-02-28
     * @param {string} options.sort The sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
     * @returns Returns the number of blocks mined daily and the amount of block rewards.
     */
    getDailyBlockCount(startDate_1, endDate_1) {
        return __awaiter(this, arguments, void 0, function* (startDate, endDate, options = {}) {
            const url = this.etherScan.constructUrl('stats', 'dailyblkcount', Object.assign({ startDate,
                endDate }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Daily Block Rewards
     * @param {string} startDate The starting date in `yyyy-MM-dd` format e.g. 2019-02-01
     * @param {string} endDate The ending date in `yyyy-MM-dd` format e.g. 2019-02-28
     * @param {string} options.sort The sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
     * @returns Returns the amount of block rewards distributed to miners daily.
     */
    getDailyBlockRewards(startDate_1, endDate_1) {
        return __awaiter(this, arguments, void 0, function* (startDate, endDate, options = {}) {
            const url = this.etherScan.constructUrl('stats', 'dailyblockrewards', Object.assign({ startDate,
                endDate }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Daily Average Time for A Block to be Included in the Ethereum Blockchain
     * @param {string} startDate The starting date in `yyyy-MM-dd` format e.g. 2019-02-01
     * @param {string} endDate The ending date in `yyyy-MM-dd` format e.g. 2019-02-28
     * @param {string} options.sort The sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
     * @returns Returns the daily average of time needed for a block to be successfully mined.
     */
    getDailyAvgBlockTime(startDate_1, endDate_1) {
        return __awaiter(this, arguments, void 0, function* (startDate, endDate, options = {}) {
            const url = this.etherScan.constructUrl('stats', 'dailyavgblocktime', Object.assign({ startDate,
                endDate }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Daily Uncle Block Count and Rewards
     * @param {string} startDate The starting date in `yyyy-MM-dd` format e.g. 2019-02-01
     * @param {string} endDate The ending date in `yyyy-MM-dd` format e.g. 2019-02-28
     * @param {string} options.sort The sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
     * @returns Returns the number of 'Uncle' blocks mined daily and the amount of 'Uncle' block rewards.
     */
    getDailyUncleBlockCount(startDate_1, endDate_1) {
        return __awaiter(this, arguments, void 0, function* (startDate, endDate, options = {}) {
            const url = this.etherScan.constructUrl('stats', 'dailyuncleblkcount', Object.assign({ startDate,
                endDate }, options));
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
}
exports.Block = Block;
