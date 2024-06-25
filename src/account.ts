import { EtherScan } from './client';
import {
  BalanceResponse,
  BlockType,
  BlockValidationOptions,
  GetBalanceOptions,
  TransactionOptions,
} from './types';

export class Account {
  private etherScan: EtherScan;

  constructor(etherScan: EtherScan) {
    this.etherScan = etherScan;
  }

  /**
   * Get Ether Balance for a Single or Multiple Address in a Single Call
   * @param {string} address the addresses to check for balance
   * @param {string} options.tag the string pre-defined block parameter, either `earliest`, `pending` or `latest`
   * @returns Returns the Ether balance of the given address(es).
   */
  public async getBalance(
    address: string | string[],
    { tag }: GetBalanceOptions = {}
  ): Promise<BalanceResponse> {
    let _address: string;
    let action: string;

    if (Array.isArray(address)) {
      _address = address.join(',');
      action = 'balancemulti';
    } else {
      _address = address;
      action = 'balance';
    }

    const url = this.etherScan.constructUrl('account', action, {
      address: _address,
      tag,
    });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
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
  public async getNormalTransactions(
    address: string,
    options: TransactionOptions = {}
  ): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'txlist', {
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
   * Get a list of 'Internal' Transactions by Address
   * @param {string} address the addresses to check for balance
   * @param {number} options.startBlock block number to start searching for transactions
   * @param {number} options.endBlock block number to stop searching for transactions
   * @param {number} options.page page number, if pagination is enabled
   * @param {number} options.offset the number of transactions displayed per page
   * @param {string} options.sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descendin. Tip: Specify a smaller startBlock and endBlock range for faster search results.
   * @returns Returns the list of transactions performed by an address, with optional pagination.
   */
  public async getInternalTransactions(
    address: string,
    options: TransactionOptions = {}
  ): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'txlistinternal', {
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
   * Get 'Internal Transactions' by Transaction Hash
   * @param {string} txHash the string representing the transaction hash to check for internal transactions
   * @returns Returns the list of internal transactions performed within a transaction.
   */
  public async getInternalTransactionsByHash(
    txHash: string
  ): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'txlistinternal', {
      txHash,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
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
  public async getInternalTransactionsByBlockRange(
    options: TransactionOptions = {}
  ): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'txlistinternal', {
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
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
  public async getERC20TokenEvents(
    address: string,
    contractAddress: string,
    options: TransactionOptions = {}
  ): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'tokentx', {
      address,
      contractAddress,
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
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
  public async getERC721TokenEvents(
    address: string,
    contractAddress: string,
    options: TransactionOptions = {}
  ): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'tokennfttx', {
      address,
      contractAddress,
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
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
  public async getERC1155TokenEvents(
    address: string,
    contractAddress: string,
    options: TransactionOptions = {}
  ): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'token1155tx', {
      address,
      contractAddress,
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Get list of Blocks Validated by Address
   * @param {string} address the address to check for balance
   * @param {string} blockType the pre-defined block type, either `blocks` for canonical blocks or `uncles` for uncle blocks only
   * @param {number} options.page page number, if pagination is enabled
   * @param {number} options.offset the number of transactions displayed per page
   * @returns Returns the list of blocks validated by an address.
   */
  public async getValidatedBlocks(
    address: string,
    blockType: BlockType,
    options: BlockValidationOptions = {}
  ): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'getminedblocks', {
      address,
      blockType,
      ...options,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
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
  public async getBeaconChainWithdrawals(
    address: string,
    options: TransactionOptions = {}
  ): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'txsBeaconWithdrawal', {
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
   * Get Historical Ether Balance for a Single Address By BlockNo (PRO Tier Only)
   * @param {string} address the address to check for balance
   * @param {number} blockNo block number to check balance for e.g. `12697906`
   * @returns Returns the beacon chain withdrawals made to an address.
   */
  public async getHistoricalBalance(
    address: string,
    blockNo: number
  ): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'balancehistory', {
      address,
      blockNo,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}
