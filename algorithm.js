class RandomUtils {
    static getRandomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

class PrimalUtils {
    static isPrimal(n) {
        if (n > 1) {
            for (let i = 2; i < Math.sqrt(n); i++) {
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
            n1 = RandomUtils.getRandomBetween(10, 100)
    
            if (this.isPrimal(n1) && (n1 % 6 === 5)) break
        }
    
        while (true) {
            n2 = RandomUtils.getRandomBetween(10, 100)
    
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
    const toEncryptTextArea = document.getElementById('toEncryptText')
    const toEncryptText = toEncryptTextArea.innerText

    if (!toEncryptText) {
        alert('Por favor digite um texto para ser codificado...')
        return
    }
    
    const encryptedBlocksArray = []
    
    let block, encryptedBlock = 0

    const primalPair = PrimalUtils.generatePrimalPair()

    const privateKey1 = primalPair[0]
    const privateKey2 = primalPair[1]
    const publicKey = privateKey1 * privateKey2
    
    alert(`Generated Keys: [${privateKey1}, ${privateKey2}] => ${privateKey1} * ${privateKey2} = ${publicKey}`);
    
    for (const char of toEncryptText) {
        if (char === ' ') {
            block = char.charCodeAt(0) + 67
        } else {
            block = char.charCodeAt(0) - 55
        }

        encryptedBlock = Math.pow(block, 3) % publicKey

        encryptedBlocksArray.push(encryptedBlock)
    }

    toEncryptTextArea.innerText = ''
    
    let encryptedText = encryptedBlocksArray.join(' ')
    
    document.getElementById('encryptedText').innerText = encryptedText    
    document.getElementById('keyP').value = privateKey1
    document.getElementById('keyQ').value = privateKey2
    document.getElementById('toDecryptText').innerText = encryptedText
}

function decrypt() {
    const toDecryptTextArea = document.getElementById('toDecryptText')
    if (!toDecryptTextArea.innerText) {
        alert('Por favor insira um RSA para ser decodificado...')
        return
    }

    const encryptedBlocksArray = toDecryptTextArea.innerText.split(' ')

    const decryptedBlocksArray = []
    const decryptedCharArray = []
    
    
    const privateKey1 = parseInt(document.getElementById('keyP').value)
    const privateKey2 = parseInt(document.getElementById('keyQ').value)
    const publicKey = privateKey1 * privateKey2

    let decryptingKey = ModularArithmeticUtils.getInverse(3, (privateKey1 - 1) * (privateKey2 - 1))
    alert(`Decrypting key: ${decryptingKey}`)

    for (const encryptedBlock of encryptedBlocksArray) {
        decryptedBlocksArray.push( BigInt( BigInt(encryptedBlock) ** BigInt(decryptingKey) ) % BigInt(publicKey) )
    }
    
    let decryptedBlockAsNumber = 0
    for (const decryptedBlock of decryptedBlocksArray) {
        decryptedBlockAsNumber = parseInt(decryptedBlock)

        if (decryptedBlockAsNumber === 99) {
            decryptedCharArray.push( String.fromCharCode( decryptedBlockAsNumber - 67 ) )
        } else {
            decryptedCharArray.push( String.fromCharCode( decryptedBlockAsNumber + 55 ) )
        }
    }

    let decryptedText = decryptedCharArray.join('')

    document.getElementById('encryptedText').innerText = ''
    document.getElementById('keyP').value = ''
    document.getElementById('keyQ').value = ''
    toDecryptTextArea.innerText = ''
    document.getElementById('decryptedText').innerText = decryptedText
}

function setTextCursorOnEnd(object) {
    if (object.tagName !== 'TEXTAREA' && object.getAttribute('contenteditable') === 'true') {
        object.focus()
        window.getSelection().selectAllChildren(object)
        window.getSelection().collapseToEnd()
    } else {
        object.focus()
        object.select()
        window.getSelection().collapseToEnd()
    }
}

function toUpperAndKeepAlphabets(object) {
    object.innerText = object.innerText.toUpperCase().replace(/[^A-Z ]/g, '')
    setTextCursorOnEnd(object)
}

function keepNumbers(object) {
    object.innerText = object.innerText.replace(/[^0-9 ]/g, '')
    setTextCursorOnEnd(object)
}