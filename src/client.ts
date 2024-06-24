type Network = 'mainnet' | 'sepolia' | 'goerli';
type Tag = 'earliest' | 'pending' | 'latest';
type Sort = 'asc' | 'desc';
type BlockType = 'blocks' | 'uncles';

interface EtherScanConfig {
  apikey: string;
  network?: Network;
}

interface BalanceResponse {
  status: string;
  message: string;
  result: string;
}

interface ABIResponse {
  status: string;
  message: string;
  result: string;
}

interface EtherscanParams {
  address?: string;
  tag?: Tag;
  startblock?: number;
  endblock?: number;
  page?: number;
  offset?: number;
  sort?: Sort;
  txhash?: string;
  contractaddress?: string;
  blocktype?: BlockType;
  blockno?: number;
}

interface GetBalanceOptions extends Pick<EtherscanParams, 'tag'> {}
interface GetNormalTransactionsOptions
  extends Pick<
    EtherscanParams,
    'startblock' | 'endblock' | 'page' | 'offset' | 'sort'
  > {}

class Account {
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
   * @param {number} options.startblock block number to start searching for transactions
   * @param {number} options.endblock block number to stop searching for transactions
   * @param {number} options.page page number, if pagination is enabled
   * @param {number} options.offset the number of transactions displayed per page
   * @param {string} options.sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descendin. Tip: Specify a smaller startblock and endblock range for faster search results.
   * @returns Returns the list of transactions performed by an address, with optional pagination.
   */
  public async getNormalTransactions(
    address: string,
    { ...options }: GetNormalTransactionsOptions = {}
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
}

class Contract {
  private etherScan: EtherScan;

  constructor(etherScan: EtherScan) {
    this.etherScan = etherScan;
  }

  public async getABI(address: string): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('contract', 'getabi', { address });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}

export class EtherScan {
  // Define Private variables
  private BASE_URL_MAINNET = 'https://api.etherscan.io/api';
  private BASE_URL_SEPOLIA = 'https://api-sepolia.etherscan.io/api';
  private BASE_URL_GOERLI = 'https://api-goerli.etherscan.io/api';
  private API_KEY: string;

  network?: Network;
  public account: Account;
  public contract: Contract;

  constructor({ apikey, network = 'mainnet' }: EtherScanConfig) {
    // Throw an error if the API key is not provided
    if (!apikey) {
      throw new Error('API key is required');
    }

    this.API_KEY = apikey;
    this.network = network;
    this.account = new Account(this);
    this.contract = new Contract(this);
  }

  getBaseUrl(): string {
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

  constructUrl(
    module: string,
    action: string,
    params: EtherscanParams
  ): string {
    const baseUrl = this.getBaseUrl();
    const _params = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    );
    const queryParams = new URLSearchParams({
      ..._params,
      module,
      action,
      apikey: this.API_KEY,
    }).toString();

    return `${baseUrl}?${queryParams}`;
  }
}
