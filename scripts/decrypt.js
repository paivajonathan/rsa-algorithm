import { getInverse } from "./modularArithmeticUtils.js"

export function decrypt() {
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

    let decryptingKey = getInverse(3, (privateKey1 - 1) * (privateKey2 - 1))
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