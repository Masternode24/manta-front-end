// @ts-nocheck
const FINALIZED = 'finalized';
const FAILED = 'failed';
const PROCESSING = 'processing';

export default class TxStatus {
  constructor(status, extrinsic = null, subscanUrl = null, message = null) {
    this.status = status;
    this.extrinsic = extrinsic;
    this.subscanUrl = subscanUrl;
    this.message = message;
    this.batchNum = null;
    this.totalBatches = null;
  }

  static processing(message) {
    return new TxStatus(PROCESSING, null, null, message);
  }

  // Block explorer URL provided only for transactions on non-manta chains
  static finalized(extrinsic, subscanUrl = null) {
    return new TxStatus(FINALIZED, extrinsic, subscanUrl);
  }

  static failed() {
    return new TxStatus(FAILED);
  }

  isProcessing() {
    return this.status === PROCESSING;
  }

  isFinalized() {
    return this.status === FINALIZED;
  }

  isFailed() {
    return this.status === FAILED;
  }

  toString() {
    let message = this.status;
    if (this.message) {
      message += `;\n ${this.message}`;
    }
    return message;
  }
}
