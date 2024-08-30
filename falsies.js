/**
 * https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 */


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
    {},
]

let values = [...falsies, ...truthies]
let t = {}

/*******************************************************************/


console.log("1) Types")
for (f of values) {
    console.log('\t'+f+' is', typeof f)
}


console.log("\n2) As if condition")
for (f of values) {
    if(f) {console.log('\t'+f,'evaluates to true') }
    else {console.log('\t'+f,'evaluates to false') }
}


console.log("\n3) Equality")
t={}
for (f of values) {
    let j={}
    for (w of values) {
        if (f==w) {j[w]=('==')}
        else {j[w]=('!=')}
    }
    t[f] = j
}
console.table(t)


console.log("\n4) Identity")
t={}
for (f of values) {
    let j={}
    for (w of values) {
        if (f==w) {j[w]=('===')}
        else {j[w]=('!==')}
    }
    t[f] = j
}
console.table(t)


console.log("\n5) Add 1")
for (f of values) {
    console.log('\t'+f,'+ 1 =', f+1)
}


console.log("\n6) Add 'A''")
for (f of values) {
    console.log('\t'+f,'+ \'A\' =', f+'A')
}


console.log("\n7) single negation (interpret as boolane)")
for (f of values) {
    console.log('\t!'+f,'=', !f)
}


console.log("\n8) double negation (inverse of #7)")
for (f of values) {
    console.log('\t!!'+f,'=', !!f)
}


console.log("\n9) Cast to Boolean (same as #7)")
for (f of values) {
    console.log('\tBoolan of',f,'=', Boolean(f))
}
