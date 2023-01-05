import Decimal from 'decimal.js';

export default class Usd {
  value: Decimal;

  constructor(value: Decimal) {
    this.value = value;
  }

  add(usd: Usd) {
    this.value = this.value.add(usd.value);
  }

  minus(usd: Usd) {
    this.value = this.value.minus(usd.value);
  }

  mul(value: Decimal) {
    this.value = this.value.mul(value);
  }

  div(value: Decimal) {
    this.value = this.value.div(value);
  }

  toString() {
    return `$${this.value
      .toDecimalPlaces(2, Decimal.ROUND_DOWN)
      .toNumber()
      .toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })}`;
  }
}
