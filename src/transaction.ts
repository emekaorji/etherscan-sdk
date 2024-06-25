import { EtherScan } from './client';
import { ABIResponse } from './types';

export class Contract {
  private etherScan: EtherScan;

  constructor(etherScan: EtherScan) {
    this.etherScan = etherScan;
  }

  /**
   * Check Contract Execution Status
   * @param {string} txHash the transaction hash to check the execution status
   * @returns Returns the status code of a contract execution.
   */
  public async checkExecutionStatus(txHash: string): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl('transaction', 'getstatus', {
      txHash,
    });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  /**
   * Check Transaction Receipt Status
   *
   * **Only applicable for post Byzantium Fork transactions.**
   *
   * @param {string} txHash the transaction hash to check the execution status
   * @returns Returns the status code of a transaction execution.
   */
  public async checkTXReceiptStatus(txHash: string): Promise<ABIResponse> {
    const url = this.etherScan.constructUrl(
      'transaction',
      'gettxreceiptstatus',
      { txHash }
    );
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}
