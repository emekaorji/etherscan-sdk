import { EtherScan } from './client';
import { ABIResponse, Closest, Sort } from './types';

export class Block {
  private etherScan: EtherScan;

  constructor(etherScan: EtherScan) {
    this.etherScan = etherScan;
  }

  /**
   * Get Block And Uncle Rewards by BlockNo
   * @param {number} blockNo The block number to check block rewards for e.g. `12697906`
   * @returns Returns the block reward and 'Uncle' block rewards.
   */
  public async getBlockReward(blockNo: number): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('block', 'getblockreward', {
      blockNo,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Get Estimated Block Countdown Time by BlockNo
   * @param {number} blockNo The block number to estimate time remaining to be mined e.g. `12697906`
   * @returns Returns the estimated time remaining, in seconds, until a certain block is mined.
   */
  public async getBlockCountdown(blockNo: number): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('block', 'getblockcountdown', {
      blockNo,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Get Block Number by Timestamp
   * @param {number} timestamp The Unix timestamp in seconds
   * @param {string} options.closest The closest available block to the provided timestamp, either `before` or `after`
   * @returns Returns the block number that was mined at a certain timestamp.
   */
  public async getBlockNumberByTimestamp(
    timestamp: number,
    options: { closest?: Closest } = {}
  ): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('block', 'getblocknobytime', {
      timestamp,
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Get Daily Average Block Size
   * @param {string} startDate The starting date in `yyyy-MM-dd` format e.g. 2019-02-01
   * @param {string} endDate The ending date in `yyyy-MM-dd` format e.g. 2019-02-28
   * @param {string} options.sort The sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
   * @returns Returns the daily average block size within a date range.
   */
  public async getDailyAvgBlockSize(
    startDate: string,
    endDate: string,
    options: { sort?: Sort } = {}
  ): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('stats', 'dailyavgblocksize', {
      startDate,
      endDate,
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Get Daily Block Count and Rewards
   * @param {string} startDate The starting date in `yyyy-MM-dd` format e.g. 2019-02-01
   * @param {string} endDate The ending date in `yyyy-MM-dd` format e.g. 2019-02-28
   * @param {string} options.sort The sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
   * @returns Returns the number of blocks mined daily and the amount of block rewards.
   */
  public async getDailyBlockCount(
    startDate: string,
    endDate: string,
    options: { sort?: Sort } = {}
  ): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('stats', 'dailyblkcount', {
      startDate,
      endDate,
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Get Daily Block Rewards
   * @param {string} startDate The starting date in `yyyy-MM-dd` format e.g. 2019-02-01
   * @param {string} endDate The ending date in `yyyy-MM-dd` format e.g. 2019-02-28
   * @param {string} options.sort The sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
   * @returns Returns the amount of block rewards distributed to miners daily.
   */
  public async getDailyBlockRewards(
    startDate: string,
    endDate: string,
    options: { sort?: Sort } = {}
  ): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('stats', 'dailyblockrewards', {
      startDate,
      endDate,
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Get Daily Average Time for A Block to be Included in the Ethereum Blockchain
   * @param {string} startDate The starting date in `yyyy-MM-dd` format e.g. 2019-02-01
   * @param {string} endDate The ending date in `yyyy-MM-dd` format e.g. 2019-02-28
   * @param {string} options.sort The sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
   * @returns Returns the daily average of time needed for a block to be successfully mined.
   */
  public async getDailyAvgBlockTime(
    startDate: string,
    endDate: string,
    options: { sort?: Sort } = {}
  ): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('stats', 'dailyavgblocktime', {
      startDate,
      endDate,
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Get Daily Uncle Block Count and Rewards
   * @param {string} startDate The starting date in `yyyy-MM-dd` format e.g. 2019-02-01
   * @param {string} endDate The ending date in `yyyy-MM-dd` format e.g. 2019-02-28
   * @param {string} options.sort The sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
   * @returns Returns the number of 'Uncle' blocks mined daily and the amount of 'Uncle' block rewards.
   */
  public async getDailyUncleBlockCount(
    startDate: string,
    endDate: string,
    options: { sort?: Sort } = {}
  ): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('stats', 'dailyuncleblkcount', {
      startDate,
      endDate,
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}
