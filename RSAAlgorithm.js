let primalPair = []

class PrimalUtils {
    static isPrimal(n) {
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
    
    static generatePrimalPair() {
        let n1, n2 = 0
        
        while (true) {
            n1 = Math.floor(Math.random() * 100)
    
            if (this.isPrimal(n1) && (n1 % 6 === 5)) break
        }
    
        while (true) {
            n2 = Math.floor(Math.random() * 100)
    
            if (this.isPrimal(n2) && (n2 % 6 === 5) && (n2 !== n1)) break
        }
    
        return [n1, n2]
    }
}

class ModularArithmeticUtils {
    static getInverse(n, mod) {
        for (let i = 1; i < mod; i++) {
            if ( (n*i) % mod === 1 ) return i
        }
        return -1
    }
}

function encrypt() {
    const toEncryptTextInput = document.getElementById('toEncryptText')
    const toEncryptText = toEncryptTextInput.value
    
    const encryptedTextResult = document.getElementById('encryptedText')
    const toDecryptTextInput = document.getElementById('toDecryptText')
    
    const encryptedBlocksArray = []
    let encryptedText = ''
    
    let block, encryptedBlock = 0

    primalPair = PrimalUtils.generatePrimalPair()

    const p = primalPair[0]
    const q = primalPair[1]
    const n = p * q
    
    console.clear()
    console.log(`Generated Keys: [${p}, ${q}] => ${p} * ${q} = ${n}`);

    for (const char of toEncryptText) {
        if (char === ' ') {
            block = char.charCodeAt(0) + 67
        } else {
            block = char.charCodeAt(0) - 55
        }

        encryptedBlock = Math.pow(block, 3) % n

        console.log(`Block: ${block}`);
        console.log(`Encrypted Block: ${encryptedBlock}`);

        encryptedBlocksArray.push(encryptedBlock)
    }

    toEncryptTextInput.value = ''
    
    encryptedText = encryptedBlocksArray.join(' ')
    
    encryptedTextResult.textContent = encryptedText
    toDecryptTextInput.value = encryptedText
}

function decrypt() {
    const encryptedTextResult = document.getElementById('encryptedText')

    const toDecryptTextInput = document.getElementById('toDecryptText')
    const encryptedBlocksArray = toDecryptTextInput.value.split(' ')

    const decryptedTextResult = document.getElementById('decryptedText')

    const decryptedBlocksArray = []
    const decryptedTextArray = []
    
    let decryptedBlockAsNumber = 0 

    const p = primalPair[0]
    const q = primalPair[1]
    const n = p * q

    let d = ModularArithmeticUtils.getInverse(3, (p-1)*(q-1))
    console.log(`Inverse of 3 mod(${(p-1)*(q-1)}): ${d}`);

    for (const encryptedBlock of encryptedBlocksArray) {
        decryptedBlocksArray.push( BigInt( BigInt(encryptedBlock) ** BigInt(d) ) % BigInt(n) )
    }

    for (const decryptedBlock of decryptedBlocksArray) {
        decryptedBlockAsNumber = parseInt(decryptedBlock)

        if (decryptedBlockAsNumber === 99) {
            decryptedTextArray.push( String.fromCharCode( decryptedBlockAsNumber - 67 ) )
        } else {
            decryptedTextArray.push( String.fromCharCode( decryptedBlockAsNumber + 55 ) )
        }
    }

    encryptedTextResult.textContent = ''
    toDecryptTextInput.value = ''

    decryptedTextResult.textContent = decryptedTextArray.join('')
}

function toUpper(object) {
    object.value = object.value.toUpperCase().replace(/[^A-Z ]/g, '')
}