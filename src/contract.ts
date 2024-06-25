import { EtherScan } from './client';
import {
  ABIResponse,
  VerificationOptionsProxy,
  VerificationOptionsSourceCode,
} from './types';

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
   * Submits a contract source code to an Etherscan-like explorer for verification.
   * @param {string} options.chainId the chain to submit verification, such as `1` for mainnet. See {@link https://docs.etherscan.io/contract-verification/supported-chains} for a list of supported chain IDs
   * @param {string} options.codeformat for single file, use `solidity-single-file`. for JSON file ( recommended ), use `solidity-standard-json-input`
   * @param {string} options.sourceCode the Solidity source code
   * @param {string} options.constructorArguements optional, include if your contract uses constructor arguments
   * @param {string} options.contractName the name of your contract, such as `contracts/Verified.sol:Verified`
   * @param {string} options.contractAddress the address your contract is deployed at
   * @param {string} options.compilerVersion compiler version used, such as `v0.8.26+commit.8a97fa7a`. See {@link https://etherscan.io/solcversions} for more versions
   * @returns a 50-character string `GUID` that serves as a receipt of successful submission
   */
  public async verifySourceCode(
    options: VerificationOptionsSourceCode
  ): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('contract', 'verifysourcecode', {});

    const _options = Object.fromEntries(
      Object.entries(options).map(([key, value]) => [
        key.toLowerCase(),
        String(value),
      ])
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

  /**
   * Submits a proxy contract to an Etherscan-like explorer for verification.
   * @param {string} options.contractAddress the address your contract is deployed at
   * @param {string} options.expectedImplementation compiler version used, such as `v0.8.26+commit.8a97fa7a`. See {@link https://etherscan.io/solcversions} for more versions
   * @returns a 50-character string `GUID` that serves as a receipt of successful submission
   */
  public async verifyProxyContract(
    options: VerificationOptionsProxy
  ): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl(
      'contract',
      'verifyproxycontract',
      {}
    );

    const _options = Object.fromEntries(
      Object.entries(options).map(([key, value]) => [key.toLowerCase(), value])
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

  /**
   * Check Source Code Verification Status
   * @param {string} guid the unique `guid` received from the verification request
   * @returns Returns the success or error status of a contract verification request.
   */
  public async checkVerificationStatus(guid: string): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('contract', 'checkverifystatus', {
      guid,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}
