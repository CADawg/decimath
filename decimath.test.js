// Basic Tests for Decimath
const BigNumber = require("./decimath");

function assert(bool) {
    if (!bool) {
        throw new Error("Tests Failed");
    }
}

// Same Value
((number) => {
    console.log("Testing Creating Number");
    assert(BigNumber(number).valueOf() === number);
})(4.493);

// Doing maths
((number) => {
    console.log("Testing Add Function");
    let bn = BigNumber(number);
    bn.add(0.1);
    assert(bn.valueOf() === 0.3);
})(0.2);

console.log("Tests Passed!");