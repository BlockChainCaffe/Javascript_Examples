/*
    This function returns the differences between two objects
    Picture this scenario
    A client requests data to some API, the server reply is a JSON
    the user changes some data into the client, then needs to post
    only the fields that were changed to update the server
    We need to find the differences between the 2 objects to do this

    This function receives two objects A and B, checks them and return
    an array of 2 object containing

    0] the keys/values in A that are different from those in B
    1] the keys/values in B that are different from those in A

*/

function diffObjects(A, B) {
    const diffA = {}; // Differences from A to B
    const diffB = {}; // Differences from B to A

    // Helper function to check if a value is an object (and not an array)
    function isObject(obj) {
        return obj && typeof obj === 'object' && !Array.isArray(obj);
    }

    // Compare keys from both A and B
    function findDifferences(A, B, diffA, diffB) {
        for (let key in A) {
            if (B.hasOwnProperty(key)) {
                if (isObject(A[key]) && isObject(B[key])) {
                    const nestedDiffA = {};
                    const nestedDiffB = {};
                    findDifferences(A[key], B[key], nestedDiffA, nestedDiffB);
                    if (Object.keys(nestedDiffA).length > 0) {
                        diffA[key] = nestedDiffA;
                    }
                    if (Object.keys(nestedDiffB).length > 0) {
                        diffB[key] = nestedDiffB;
                    }
                } else if (A[key] !== B[key]) {
                    diffA[key] = A[key]; // Difference in A
                    diffB[key] = B[key]; // Difference in B
                }
            } else {
                diffA[key] = A[key]; // Key exists in A but not in B
            }
        }

        // Check for keys that exist in B but not in A
        for (let key in B) {
            if (!A.hasOwnProperty(key)) {
                diffB[key] = B[key]; // Key exists in B but not in A
            }
        }
    }

    findDifferences(A, B, diffA, diffB);
    return [diffA, diffB]; // Return the two difference objects as an array
}

// Example usage
const A = {
    name: "Alice",
    age: 30,
    address: {
        city: "New York",
        zip: 90001
    },
    hobbies: ["reading", "swimming"],
    job: "driver" 
};

const B = {
    name: "Alice",
    age: 31,
    address: {
        city: "Los Angeles",
        zip: 90001
    },
    hobbies: ["reading"],
    pet: {
        species: "cat",
    }
};

console.log(diffObjects(A, B));
