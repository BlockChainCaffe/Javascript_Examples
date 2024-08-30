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
    'b'
]

let values = [...falsies, ...truthies]

let x

function f(v,n) {
    console.log('\t'+v,'results in',n, )
    return true
}

/*******************************************************************/

console.log("\n1) Logical `||` or operator")
for (v of values) {
    x = (v || 'default')
    f(v,x)
}


console.log("\n2) Logical `||` or assignment")
for (v of values) {
    x = v
    x ||= 'default'
    f(v,x)
}


console.log("\n3) `??` or `nullish coalescing operator`")
for (v of values) {
    x = v ?? 'default'
    f(v,x)
}

