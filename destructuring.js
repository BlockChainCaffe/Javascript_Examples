let origin = {
    'alpha' : 1,
    'beta'  : 'BBB',
    'gamma' : [1,'w',{'a':4}],
    simulate : true
}

let arry = [1,3,3,3,4,5,6]

function simulate(ok) {
    let result = {}
    if (ok) {
        // Sumulate all right: return some data
        result = {
            ok      : true,
            data    : 'some data'
        }

    } else {
        // Simulate error: no data but error
        result = {
            ok      : false,
            error   : {
                message : 'some error happened',
                code    : 130
            }
        }
    }
    return result
}


/*******************************************************************/

// Basic destructuring:
// get only some object values
let {alpha, gamma} = origin
console.log(alpha)

// get an object value and rename it
let {beta:second} = origin
console.log(second)

// try to ge a value that is not there
let {missing} = origin
console.log(missing)


/******************************************************************************
    Deconstructuring a function result:
    The function can return an object whose values in the object may vary
    In both cases function returns an obj with 2 values but we pick 3
    Very useful for complex return values
*/

for (v of [false, true]) {
    let {ok, data, error} = simulate(v)
    console.log(ok)
    console.log(data)
    console.log(error)
}

/******************************************************************************
    Deconstructuring Lists
*/

// Pick the first element of arry (and discard others)
let [b] = arry
console.log(b)

// Pick first, second and the rest in a sublist
let [c,d,...rest] = arry
console.log(c, d)
console.log(rest)


