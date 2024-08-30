// Data used in the tricks example

let arry = [1,3,3,3,4,5,6]

let origin = {
    'alpha' : 1,
    'beta'  : 'BBB',
    'gamma' : [1,'w',{'a':4}],
    simulate : true
}

/*****************************************************************************/

// List LIGHT copy Spread operator
let b = [...arry]


// JSON deep copy
let destination = JSON.parse(JSON.stringify(origin))


// Remove duplicates form list
// list become set (that does not allow duplicates)
// and goes back to list
// Using old syntax
arry = Array.from(new Set(arry))
// Using spread operator
arry = [... new Set(arry)]


// Sleep function (in milliseconds)
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))


// Time execution using console.time and labeled timers
console.time('start label')
sleep(3000)
console.timeEnd('start label')


// 'range' like 
// Create an Array of 5 elements and spread the keys => 0...4
let range = [...Array(5).keys()]