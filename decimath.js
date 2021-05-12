// Decimath
// Copyright Snaddyvitch-Dispenser 2021
// MIT LICENCE

class BigNumberClass {
  constructor(integer, power) {
    this.power = power;
    this.integer = integer;
  }

  static fromNumber(number) {
    if (number instanceof BigNumberClass) return number;
    if (number instanceof String || typeof number === "string") {
      number = Number(number);
    }

    let power = getPowerRequiredToMakeWhole(number);

    let bigNumber = new BigNumberClass(number * (10 ** power), power);

    if (bigNumber.valueOf() !== number) {
      // Attempt Repair
      bigNumber.forgetAfterPrecision(number.toString().replace(/[^0-9]/g, '').length);
    }

    return bigNumber;
  }

  forgetAfterPrecision(precision) {
    this.integer = this.integer.toPrecision(precision);
    this.tidyZeros();
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
    return this.valueOf().toString();
  }
}

function getPowerRequiredToMakeWhole(number) {
  number = number.toString();
  number = number.split(".");
  if (number.length > 1) {
    return number[1].length;
  } else {
    return 0;
  }
}

function BigNumber(number) {
  let bigNumber = BigNumberClass.fromNumber(number);
  console.log(bigNumber);
  if (bigNumber.valueOf() != number) {
    throw new Error("This number wasn't cast properly. This is a problem with Decimath. Please Report it Here: https://github.com/Snaddyvitch-Dispenser/decimath/issues");
  }

  return bigNumber;
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
