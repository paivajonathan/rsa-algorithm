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
    
    const encryptedBlocksArray = []
    
    let block, encryptedBlock = 0

    const primalPair = PrimalUtils.generatePrimalPair()

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
    
    let encryptedText = encryptedBlocksArray.join(' ')
    
    document.getElementById('encryptedText').textContent = encryptedText    
    document.getElementById('keyP').value = p
    document.getElementById('keyQ').value = q
    document.getElementById('toDecryptText').value = encryptedText
}

function decrypt() {
    const toDecryptTextInput = document.getElementById('toDecryptText')
    const encryptedBlocksArray = toDecryptTextInput.value.split(' ')

    const decryptedBlocksArray = []
    const decryptedCharArray = []
    
    let decryptedBlockAsNumber = 0

    const p = parseInt(document.getElementById('keyP').value)
    const q = parseInt(document.getElementById('keyQ').value)
    const n = p * q

    let d = ModularArithmeticUtils.getInverse(3, (p-1)*(q-1))
    console.log(`Inverse of 3 mod(${(p-1)*(q-1)}): ${d}`);

    for (const encryptedBlock of encryptedBlocksArray) {
        decryptedBlocksArray.push( BigInt( BigInt(encryptedBlock) ** BigInt(d) ) % BigInt(n) )
    }

    for (const decryptedBlock of decryptedBlocksArray) {
        decryptedBlockAsNumber = parseInt(decryptedBlock)

        if (decryptedBlockAsNumber === 99) {
            decryptedCharArray.push( String.fromCharCode( decryptedBlockAsNumber - 67 ) )
        } else {
            decryptedCharArray.push( String.fromCharCode( decryptedBlockAsNumber + 55 ) )
        }
    }

    document.getElementById('encryptedText').textContent = ''
    document.getElementById('keyP').value = ''
    document.getElementById('keyQ').value = ''
    toDecryptTextInput.value = ''
    document.getElementById('decryptedText').textContent = decryptedCharArray.join('')
}

function toUpperAndKeepAlphabets(object) {
    object.value = object.value.toUpperCase().replace(/[^A-Z ]/g, '')
}

function keepNumbers(object) {
    object.value = object.value.replace(/[^0-9]/g, '')
}