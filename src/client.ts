type Network = 'mainnet' | 'sepolia' | 'goerli';

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

class Account {
  private etherScan: EtherScan;

  constructor(etherScan: EtherScan) {
    this.etherScan = etherScan;
  }

  public async getBalance(address: string): Promise<BalanceResponse> {
    const url = this.etherScan.constructUrl('account', 'balance', { address });
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
    params: Record<string, string>
  ): string {
    const baseUrl = this.getBaseUrl();
    const queryParams = new URLSearchParams({
      ...params,
      module,
      action,
      apikey: this.API_KEY,
    }).toString();
    return `${baseUrl}?${queryParams}`;
  }
}
