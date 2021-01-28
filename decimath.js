// Decimath
// Copyright Snaddyvitch-Dispenser 2021
// MIT LICENCE

class BigNumberClass {
  constructor(integer, power) {
    this.power = power;
    this.integer = integer;
  }

  static fromNumber(number) {
    let power = 0;
    while (number % 1 !== 0) {
      power++;
      number = number * 10;
    }

    return new BigNumberClass(number, power);
  }

  setPower(power) {
    if (power < this.power) return false;

    // Update power
    this.integer = this.integer * (10 ** (power - this.power))
    this.power = power;
  }

  addPower(power) {
    this.setPower(this.power + power);
  }

  clone() {
    return new BigNumberClass(this.integer, this.power);
  }
  
  add(value) {
    if (!(value instanceof BigNumberClass)) {
      value = BigNumberClass.fromNumber(value);
    }

    if (value.power > this.power) {
      this.setPower(value.power);
    }
    if (this.power > value.power) {
      value.setPower(this.power);
    }

    // Add equal powers now
    this.integer += value.integer;

    this.tidyZeros();

    // Chaining
    return this;
  }

  subtract(value) {
    return this.add(-1 * value);
  }

  tidyZeros() {
    while (this.integer.toString().slice(-1) === "0" && this.power > 0) {
      this.integer /= 10;
      this.power -= 1;
    }
  }

  multiply(value) {
    if (!(value instanceof BigNumberClass)) {
      value = BigNumberClass.fromNumber(value);
    }

    this.power *= value.power + 1;
    this.integer *= value.integer;

    this.tidyZeros();

    return this;
  }

  pow(value) {
    if (value instanceof BigNumberClass) {
      value = BigNumberClass.valueOf();
    }

    let powr = this.clone();
    for (let i = 0; i < value; i++) {
      this.multiply(powr);
    }

    this.tidyZeros();

    return this;
  }

  divide(value) {
    if (!(value instanceof BigNumberClass)) {
      value = BigNumberClass.fromNumber(value);
    }

    this.addPower(value.integer.toString().length);

    this.power *= value.power + 1;
    this.integer /= value.integer;

    this.tidyZeros();

    return this;
  }

  valueOf() {
    return this.integer /  10 ** this.power;
  }

  toString() {
    return this.valueOf();
  }
}

function BigNumber(number) {
  return BigNumberClass.fromNumber(number);
}

// Export for browser and node/react
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = BigNumber;
  }
  exports.BigNumber = BigNumber;
} else {
  root['BigNumber'] = BigNumber;
}