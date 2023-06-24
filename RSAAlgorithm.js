function toUpper(object) {
    object.value = object.value.toUpperCase().replace(/[^A-Z ]/g, '')
}

function isPrimal(n) {
    if (n > 1) {
        for (let i = 2; i < n; i++) {
            if (n % i === 0) {
                return false
            }
        }
        return true
    } else {
        return false
    }
}

function generatePrimalPair() {
    let n1, n2 = 0
    
    while (true) {
        n1 = Math.floor(Math.random() * 100)

        if (isPrimal(n1) && (n1 % 6 === 5)) break
    }

    while (true) {
        n2 = Math.floor(Math.random() * 100)

        if (isPrimal(n2) && (n2 % 6 === 5) && (n2 !== n1)) break
    }

    return [n1, n2]
}

let primalPair = []

function encrypt() {
    const toEncryptTextElement = document.getElementById('toEncryptText')
    const toEncryptText = toEncryptTextElement.value

    const encryptedTextElement = document.getElementById('encryptedText')
    const encryptedTextArray = []

    const toDecryptTextElement = document.getElementById('toDecryptText')
    
    let block, encryptedBlock = 0

    primalPair = generatePrimalPair()

    
    const p = primalPair[0]
    const q = primalPair[1]
    const n = p * q
    
    console.log(`Keys: [${p}, ${q}] => ${p} * ${q} = ${n}`);

    for (const char of toEncryptText) {
        if (char === ' ') {
            block = char.charCodeAt(0) + 67
        } else {
            block = char.charCodeAt(0) - 55
        }

        console.log(`Block: ${block}`);
        encryptedBlock = Math.pow(block, 3) % n
        console.log(`Encrypted Block: ${encryptedBlock}`);

        encryptedTextArray.push(encryptedBlock)
    }

    toEncryptTextElement.value = ''    
    encryptedTextElement.textContent = encryptedTextArray.join(' ')

    toDecryptTextElement.value = encryptedTextArray.join(' ')
}

function getInverse(n, mod) {
    for (let i = 1; i < mod; i++) {
        if ( (n*i) % mod === 1 ) return i
    }
    return -1
}

function decrypt() {
    const toDecryptTextElement = document.getElementById('toDecryptText')
    const toDecryptTextArray = toDecryptTextElement.value.split(' ')

    const decryptedTextElement = document.getElementById('decryptedText')
    const originalNumbersArray = []
    const decryptedTextArray = []

    const p = primalPair[0]
    const q = primalPair[1]
    const n = p * q

    let d = getInverse(3, (p-1)*(q-1))
    console.log('Inverse: ' + d);

    for (const encryptedChar of toDecryptTextArray) {
        originalNumbersArray.push(BigInt(BigInt(encryptedChar) ** BigInt(d)) % BigInt(n))
    }

    let numConverted = 0
    for (const num of originalNumbersArray) {
        numConverted = Number(num)

        if (numConverted === 99) {
            decryptedTextArray.push( String.fromCharCode( Number(numConverted) - 67 ) )
        } else {
            decryptedTextArray.push( String.fromCharCode( Number(numConverted) + 55 ) )
        }
    }

    toDecryptTextElement.value = ''
    decryptedTextElement.textContent = decryptedTextArray.join('')

    console.log(decryptedTextArray);
}