/**
 * You can give names to codeblocks and to loops
 * Once in a labeled codeblock/loop you can use
 * - continue {label} and
 * - break {label}
 * to guide code execution flow
 */


// Create a for loop (0...4) with a label
loop1 : for (a of [...Array(5).keys()]) {
    // create a secon loop
    loop2 : for (b of [...Array(5).keys()]) {
        console.log(b)        
        if (b > 2) {
            continue loop1
        }
    }
}


codeblock1: {
    console.log('A')
    console.log('B')
    console.log('C')
    if (1==1) {
        break codeblock1 
    }
    console.log('D')    // This will never be executed
}


codeblock2: {
    console.log('A')
    console.log('B')
    codeblock3 : {
        console.log('C')
        if (1==1) {
            break codeblock2
        }
        break codeblock3
        console.log('D') // This will never be executed
    }
    console.log('E')    // This will never be executed

}