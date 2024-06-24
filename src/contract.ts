import { EtherScan } from './client';
import { ABIResponse } from './types';

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

interface VerificationOptions {
  chainId: (typeof Explorers)[keyof typeof Explorers];
  codeformat: string;
  sourceCode: string;
  constructorArguements: string;
  contractname: string;
  contractaddress: string;
  compilerversion: string;
}

export class Contract {
  private etherScan: EtherScan;

  constructor(etherScan: EtherScan) {
    this.etherScan = etherScan;
  }

  /**
   * Get Contract ABI for Verified Contract Source Codes
   * @param {string} address a `contract address` that has a verified source code
   * @returns Returns the Contract Application Binary Interface ( ABI ) of a verified smart contract.
   */
  public async getABI(address: string): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('contract', 'getabi', { address });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Get Contract Source Code for Verified Contract Source Codes
   * @param {string} address a `contract address` that has a verified source code
   * @returns Returns the Solidity source code of a verified smart contract.
   */
  public async getSourceCode(address: string): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('contract', 'getsourcecode', {
      address,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Get Contract Creator and Creation Tx Hash
   * @param {string} contractAddresses one or more `contract address`, up to 5 at a time
   * @returns Returns a contract's deployer address and transaction hash it was created, up to 5 at a time.
   */
  public async getCreator(
    contractAddresses: string | string[]
  ): Promise<ABIResponse> {
    const _contractAddresses = Array.isArray(contractAddresses)
      ? contractAddresses.join(',')
      : contractAddresses;
    const url = this.etherScan.constructUrl('contract', 'getcontractcreation', {
      contractAddresses: _contractAddresses,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Verify Source Code
   * @param {string} options.chainId the chain to submit verification, such as `1` for mainnet
   * @param {string} options.codeformat for single file, use `solidity-single-file`. for JSON file ( recommended ), use `solidity-standard-json-input`
   * @param {string} options.sourceCode the Solidity source code
   * @param {string} options.constructorArguements optional, include if your contract uses constructor arguments
   * @param {string} options.contractname the name of your contract, such as `contracts/Verified.sol:Verified`
   * @param {string} options.contractaddress the address your contract is deployed at
   * @param {string} options.compilerversion compiler version used, such as `v0.8.24+commit.e11b9ed9`
   * @returns Submits a contract source code to an Etherscan-like explorer for verification.
   */
  public async verifySourceCode(
    options: VerificationOptions
  ): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('contract', 'verifysourcecode', {});

    const _options = Object.fromEntries(
      Object.entries(options).map(([key, value]) => [key, String(value)])
    );
    const params = new URLSearchParams({
      ..._options,
    }).toString();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}
