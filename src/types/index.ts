export type Network = 'mainnet' | 'sepolia' | 'goerli';
export type Tag = 'earliest' | 'pending' | 'latest';
export type Sort = 'asc' | 'desc';
export type BlockType = 'blocks' | 'uncles';

export interface EtherScanConfig {
  apikey: string;
  network?: Network;
}

export interface BalanceResponse {
  status: string;
  message: string;
  result: string;
}

export interface ABIResponse {
  status: string;
  message: string;
  result: string;
}

export interface EtherscanParams {
  address?: string;
  tag?: Tag;
  startBlock?: number;
  endBlock?: number;
  page?: number;
  offset?: number;
  sort?: Sort;
  txHash?: string;
  contractAddress?: string;
  contractAddresses?: string;
  blockType?: BlockType;
  blockNo?: number;
}

export interface GetBalanceOptions extends Pick<EtherscanParams, 'tag'> {}
export interface BlockValidationOptions
  extends Pick<EtherscanParams, 'page' | 'offset'> {}
export interface TransactionOptions
  extends Pick<
    EtherscanParams,
    'startBlock' | 'endBlock' | 'page' | 'offset' | 'sort'
  > {}
