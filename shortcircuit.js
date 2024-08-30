let falsies = [
    undefined,
    null,
    0,
    NaN,
    false,
    '',
]

let truthies = [    // AKA 'non-falsies'
    1,              // Those 3 last elements are NOT falsies
    true,           // We just add them to keep them in the loop
    'b',
    [],
    {}
]

let values = [...falsies, ...truthies]

let x

function f(v,n) {
    console.log('\t'+v,'results in',n, )
    return true
}

/*******************************************************************/

console.log("1) IF test")
for (v of values) {
    if (v) {f(v,'if-branch')}
    else {f(v,'else-branch')}
}


console.log("\n2) `&&` or")
for (v of values) {
    x = (v && f(v,'function execution'))
}


console.log("\n3) `||` or")
for (v of values) {
    x = (v || f(v,'function execution'))
}
