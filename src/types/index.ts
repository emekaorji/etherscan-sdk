export type Network = 'mainnet' | 'sepolia' | 'goerli';
export type Tag = 'earliest' | 'pending' | 'latest';
export type Sort = 'asc' | 'desc';
export type BlockType = 'blocks' | 'uncles';
export type Closest = 'before' | 'after';
export type TopicOperator = 'and' | 'or';

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

export interface LogResponse {
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
  guid?: string;
  timestamp?: number;
  closest?: Closest;
  startDate?: string;
  endDate?: string;
  fromBlock?: number;
  toBlock?: number;
  topic0?: string;
  topic1?: string;
  topic2?: string;
  topic3?: string;
  topic0_1_opr?: TopicOperator;
  topic1_2_opr?: TopicOperator;
  topic2_3_opr?: TopicOperator;
  topic0_2_opr?: TopicOperator;
  topic0_3_opr?: TopicOperator;
  topic1_3_opr?: TopicOperator;
}

export interface GetBalanceOptions extends Pick<EtherscanParams, 'tag'> {}
export interface BlockValidationOptions
  extends Pick<EtherscanParams, 'page' | 'offset'> {}
export interface TransactionOptions
  extends Pick<
    EtherscanParams,
    'startBlock' | 'endBlock' | 'page' | 'offset' | 'sort'
  > {}

export interface LogOptionsAddress
  extends Pick<EtherscanParams, 'fromBlock' | 'toBlock' | 'page' | 'offset'> {}
export interface LogOptionsAddressAndTopics
  extends Pick<
    EtherscanParams,
    | 'fromBlock'
    | 'toBlock'
    | 'page'
    | 'offset'
    | 'topic0'
    | 'topic1'
    | 'topic2'
    | 'topic3'
    | 'topic0_1_opr'
    | 'topic1_2_opr'
    | 'topic2_3_opr'
    | 'topic0_2_opr'
    | 'topic0_3_opr'
    | 'topic1_3_opr'
  > {}

type CompilerVersions =
  | 'v0.8.26+commit.8a97fa7a'
  | 'v0.8.25+commit.b61c2a91'
  | 'v0.8.24+commit.e11b9ed9'
  | 'v0.8.23+commit.f704f362'
  | 'v0.8.22+commit.4fc1097e'
  | 'v0.8.21+commit.d9974bed'
  | 'v0.8.20+commit.a1b79de6'
  | 'v0.8.19+commit.7dd6d404'
  | 'v0.8.18+commit.87f61d96'
  | 'v0.8.17+commit.8df45f5f'
  | 'v0.8.16+commit.07a7930e'
  | 'v0.8.15+commit.e14f2714'
  | 'v0.8.14+commit.80d49f37'
  | 'v0.8.13+commit.abaa5c0e'
  | 'v0.8.12+commit.f00d7308'
  | 'v0.8.11+commit.d7f03943'
  | 'v0.8.10+commit.fc410830'
  | 'v0.8.9+commit.e5eed63a'
  | 'v0.8.8+commit.dddeac2f'
  | 'v0.8.7+commit.e28d00a7'
  | 'v0.8.6+commit.11564f7e'
  | 'v0.8.5+commit.a4f2e591'
  | 'v0.8.4+commit.c7e474f2'
  | 'v0.8.3+commit.8d00100c'
  | 'v0.8.2+commit.661d1103'
  | 'v0.8.1+commit.df193b15'
  | 'v0.8.0+commit.c7dfd78e';

export const enum Explorers {
  Etherscan = 1,
  GoerliEtherscan = 5,
  SepoliaEtherscan = 11155111,
  HoleskyEtherscan = 17000,
  BscScan = 56,
  TestnetBscScan = 97,
  OpBNBBscScan = 204,
  TestnetOpBNBBscScan = 5611,
  FTMScan = 250,
  TestnetFTMScan = 4002,
  OptimisticEtherscan = 10,
  GoerliOptimisticEtherscan = 420,
  SepoliaOptimisticEtherscan = 11155420,
  PolygonScan = 137,
  Arbiscan = 42161,
  SepoliaArbiscan = 421614,
  MoonbeamMoonscan = 1284,
  MoonbaseMoonscan = 1287,
  MoonriverMoonscan = 1285,
  BTTCScan = 199,
  DonauBTTCScan = 1028,
  CeloScan = 42220,
  AlfajoresCeloScan = 44787,
  GnosisScan = 100,
  NovaArbiscan = 42170,
  BaseScan = 8453,
  SepoliaBaseScan = 84532,
  ZkEVMPolygonScan = 1101,
  LineaScan = 59144,
  TestnetLineaScan = 59140,
  ScrollScan = 534352,
  TestnetScrollScan = 534351,
  WemixScan = 1111,
  TestnetWemixScan = 1112,
  KromaScan = 255,
  TestnetKromaScan = 2358,
  Fraxscan = 252,
  TestnetFraxscan = 2522,
  SnowScan = 43114,
  FujiSnowScan = 43113,
  BlastScan = 81457,
  TestnetBlastScan = 23888,
}

export interface VerificationOptionsSourceCode {
  chainId: (typeof Explorers)[keyof typeof Explorers];
  codeformat: 'solidity-single-file' | 'solidity-standard-json-input';
  sourceCode: string;
  constructorArguements: string;
  contractName: string;
  contractAddress: string;
  compilerVersion: CompilerVersions;
}

export interface VerificationOptionsProxy {
  contractAddress: string;
  expectedImplementation?: string;
}
