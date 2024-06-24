import { EtherScan } from './client';
import { ABIResponse } from './types';

interface VerificationOptions {
  chainId: string;
  codeformat: string;
  sourceCode: string;
  constructorArguements: string;
  contractname: string;
  contractaddress: string;
  compilerversion: string;
}

const enum ChainName {
  'Etherscan' = 1,
  'Goerli Etherscan' = 5,
  'Sepolia Etherscan' = 11155111,
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

    const params = new URLSearchParams({
      ...options,
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
