/*
    CRYPTO MODULE Exercises

    General advice:
        - better use Buffers for everything
        - https://nodejs.org/api/buffer.html
 */

//Checking the crypto module
const crypto = require('crypto');
const pako   = require('pako')


const algorithm = 'aes-256-cbc'; //Using AES encryption


/******************************************************************************
 * INSPECTIONS FUNCTIONS
 */

// Get a list of all the cyphers argorithms that are available in module
const cyphers = crypto.getCiphers()


// Get some tech info about that cypher
// This is needed later to get the right sizes for algorithm parameters
const cyphers_info = crypto.getCipherInfo(algorithm)
// {
//     mode: "cbc",
//     name: "aes-256-cbc",
//     nid: 427,
//     blockSize: 16,
//     ivLength: 16,
//     keyLength: 32,
// }


/******************************************************************************
 * BUFFER FUNCTIONS
 * There should be no need to use any of these as funcions since they are oneliners
 * yet, for the sake of clarity, let's just keep them as examples
 */

function utf8_to_buffer (utf_8) {
    let buff = Buffer.from(utf_8)
    return buff
}

function hex_to_buffer (hex) {
    let buff = Buffer.from(hex, 'hex')
    return buff
}

function base64_to_buffer(b64) {
    let buff = Buffer.from(b64, 'base64')
    return buff
}


function buffer_to_utf8 (buff) {
    return buff.toString('utf8')
}

function buffer_to_hex (buff) {
    return buff.toString('hex')
}

function buffer_to_base64 (buff) {
    return buff.toString('base64')
}


/******************************************************************************
 * KEY and IV FUNCTIONS
 */

// Returns a random Buffer of desired length
function make_rnd_buffer(length) {
    return crypto.randomBytes(length);
}

// Given a secret string it returns an hex-string
// Note: this is not a format transformation, it includes a hash
function secret_to_hex_string(string, length) {
    const encryptionIV = crypto
        .createHash('sha512')
        .update(string)
        .digest('hex')
        .substring(0, length*2)
    return encryptionIV
}


/******************************************************************************
 * ENCRIPTION AND DECRYPTION FUNCTIONS
 */


/**
 * Generic ecrypt data function
 * Netter to use Buffers for every params
 * See https://nodejs.org/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options
 * @param {*} algo  : one of the algos returned by crypto.getCiphers()
 * @param {*} key   : Strig, Buffer,  .... 
 * @param {*} iv    : Strig, Buffer,  .... 
 * @param {*} data  : Buffer
 * @returns a Buffer, later this buffer must be trasnformed in the desired format
 */
function encrypt (algo, key, iv, data) {
    let cipher = crypto.createCipheriv(algo, key, iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted
    // return encrypted.toString('hex')
}


function decrypt (algo, key, iv, data) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(data);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted
}


// //Encrypting text
// function encrypt(text) {
//    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//    let encrypted = cipher.update(text);
//    encrypted = Buffer.concat([encrypted, cipher.final()]);
//    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

// // Decrypting text
// function decrypt(text) {
//    let iv = Buffer.from(text.iv, 'hex');
//    let encryptedText = Buffer.from(text.encryptedData, 'hex');
//    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//    let decrypted = decipher.update(encryptedText);
//    decrypted = Buffer.concat([decrypted, decipher.final()]);
//    return decrypted.toString();
// }



/******************************************************************************
 * Tests
 */


// Create IV and KEY according to Alogorithm parameters

const iv_str    = 'pretty iv string'
const key_str   = 'pretty key string'

const key_hex   = secret_to_hex_string(key_str, cyphers_info.keyLength)
const key_buff  = hex_to_buffer(key_hex)

const iv_hex    = secret_to_hex_string(iv_str, cyphers_info.ivLength)
const iv_buff   = hex_to_buffer(iv_hex)


// ----------------------------------------------------------------------------
// Test 1: normal utf8 text

let input = 'In the software development world, developers use cryptography and encryption techniques to secure sensitive data from malicious entities.'
let encrypted = encrypt(algorithm, key_buff, iv_buff, input)
let decrypted = decrypt(algorithm, key_buff, iv_buff, encrypted)
let output = buffer_to_utf8(decrypted)

if (output !== input) {
    throw ("utf8 text test failed")
}


// ----------------------------------------------------------------------------
// Test 2: JSON (it's just another UTF8 text)
input = {
	"id": "0001",
	"type": "donut",
	"name": "Cake",
	"image":
		{
			"url": "images/0001.jpg",
			"width": 200,
			"height": 200
		},
	"thumbnail":
		{
			"url": "images/thumbnails/0001.jpg",
			"width": 32,
			"height": 32
		}
}
encrypted = encrypt(algorithm, key_buff, iv_buff, JSON.stringify(input))
decrypted = decrypt(algorithm, key_buff, iv_buff, encrypted)
output = buffer_to_utf8(decrypted)
output = JSON.parse(output)
if (input.image.height !== output.image.height) {
    throw ("JSON test failed")
}

// ----------------------------------------------------------------------------
// Test 3: JSON -> string -> compressed (Uint8Array) -> encrypt/decript -> inflate

stringed = JSON.stringify(input)                                    // JSON -> String 
deflated = pako.deflate(stringed)                                   // String -> compressed Uint8Array
deflated = Buffer.from(deflated)                                    // Uint8Array -> Buffer (opional)                               
encrypted = encrypt(algorithm, key_buff, iv_buff, deflated)         // Buffer -> Encrypted Buffer
decrypted = decrypt(algorithm, key_buff, iv_buff, encrypted)        // Encrypted Buffer -> compressed buffer
inflated = pako.inflate(decrypted)                                  // compressed Buffer -> decompressed Uint8Array  
inflated = Buffer.from(inflated)                                    // decompressed Uint8Array -> decompressed Buffer
inflated = inflated.toString('ascii')                               // decompressed Buffer -> String
output = JSON.parse(inflated)                                       // String -> JSON
if (input.image.height !== output.image.height) {
    throw ("JSON test failed")
}

console.log(stringed.length)                                        // 173 bytes
console.log(deflated.length)                                        // 111  bytes
console.log(encrypted.length)                                       // 112 Bytes (-35%)
