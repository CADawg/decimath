# DeciMath
A small JavaScript library for doing precise floating point maths

Sure, there are many maths libraries to tickle your fancy, but sometimes you just need proper floating point maths and nothing more, that's why this library exists.

## Install

### Node/React

```bash
npm install decimath
```

```bash
yarn add decimath
```

### Browser

Just copy and link to the file or include it in your scripts.

## Usage

Node Only:
```js
import BigNumber from 'decimath';
```

You'll need a `BigNumber` to make use of this. To make a new Big Number Use the following:

```js
let bn = BigNumber(0.1); // initial value
```

## Operations

All operations support a value as either a `BigNumber` or any other numeric type that can be converted to a `BigNumber`.

All operations except Power Of accept decimal values.

All operations return `this` to allow chaining. To Get the value, end the chain with `.valueOf()`

### Add

```js
bn.add(0.2); // adds 0.2 to our initial value
```

### Subtract

```js
bn.subtract(0.1); // Takes 0.1 from our value
```

### Multiply

```js
bn.multiply(100); // Multiplies value by 100
```

### Divide

```js
bn.divide(2.5); // Divides our value by 2.5
```

### Power of

```js
bn.pow(30); // bn to the power of 30
```

## Using calculated values outside of the library

Use `.valueOf()` to get the JS decimal version of the number

## Used By

[![](https://nftm.art/images/decorative/general/nftmart_wide_light_logo/onesize.png)](https://nftm.art)

## Live Preview

https://repl.it/@Snaddyvitch_Dis/Decimath-Testing
