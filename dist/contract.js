"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
class Contract {
    constructor(etherScan) {
        this.etherScan = etherScan;
    }
    /**
     * Get Contract ABI for Verified Contract Source Codes
     * @param {string} address a `contract address` that has a verified source code
     * @returns Returns the Contract Application Binary Interface ( ABI ) of a verified smart contract.
     */
    getABI(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('contract', 'getabi', { address });
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Contract Source Code for Verified Contract Source Codes
     * @param {string} address a `contract address` that has a verified source code
     * @returns Returns the Solidity source code of a verified smart contract.
     */
    getSourceCode(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('contract', 'getsourcecode', {
                address,
            });
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
    /**
     * Get Contract Creator and Creation Tx Hash
     * @param {string} contractAddresses one or more `contract address`, up to 5 at a time
     * @returns Returns a contract's deployer address and transaction hash it was created, up to 5 at a time.
     */
    getCreator(contractAddresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const _contractAddresses = Array.isArray(contractAddresses)
                ? contractAddresses.join(',')
                : contractAddresses;
            const url = this.etherScan.constructUrl('contract', 'getcontractcreation', {
                contractAddresses: _contractAddresses,
            });
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
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
    verifySourceCode(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('contract', 'verifysourcecode', {});
            const _options = Object.fromEntries(Object.entries(options).map(([key, value]) => [
                key.toLowerCase(),
                String(value),
            ]));
            const params = new URLSearchParams(Object.assign({}, _options)).toString();
            const response = yield fetch(url, {
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
        });
    }
    /**
     * Submits a proxy contract to an Etherscan-like explorer for verification.
     * @param {string} options.contractAddress the address your contract is deployed at
     * @param {string} options.expectedImplementation compiler version used, such as `v0.8.26+commit.8a97fa7a`. See {@link https://etherscan.io/solcversions} for more versions
     * @returns a 50-character string `GUID` that serves as a receipt of successful submission
     */
    verifyProxyContract(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('contract', 'verifyproxycontract', {});
            const _options = Object.fromEntries(Object.entries(options).map(([key, value]) => [key.toLowerCase(), value]));
            const params = new URLSearchParams(Object.assign({}, _options)).toString();
            const response = yield fetch(url, {
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
        });
    }
    /**
     * Check Source Code Verification Status
     * @param {string} guid the unique `guid` received from the verification request
     * @returns Returns the success or error status of a contract verification request.
     */
    checkVerificationStatus(guid) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.etherScan.constructUrl('contract', 'checkverifystatus', {
                guid,
            });
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
}
exports.Contract = Contract;
