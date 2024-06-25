import { EtherScan } from './client';
import {
  LogOptionsAddress,
  LogOptionsAddressAndTopics,
  LogResponse,
} from './types';

export class Logs {
  private etherScan: EtherScan;

  constructor(etherScan: EtherScan) {
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
  public async getLogsByAddress(
    address: string,
    options: LogOptionsAddress = {}
  ): Promise<LogResponse> {
    const url = this.etherScan.constructUrl('logs', 'getLogs', {
      address,
      ...options,
    });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
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
  public async getLogsByTopics(
    options: LogOptionsAddressAndTopics = {}
  ): Promise<LogResponse> {
    const url = this.etherScan.constructUrl('logs', 'getLogs', {
      ...options,
    });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
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
  public async getLogsByAddressAndTopics(
    address: string,
    options: LogOptionsAddressAndTopics = {}
  ): Promise<LogResponse> {
    const url = this.etherScan.constructUrl('logs', 'getLogs', {
      address,
      ...options,
    });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}
