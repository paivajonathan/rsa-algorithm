import { generatePrimalPair } from "./primalUtils.js"

export function encrypt() {
    const toEncryptTextArea = document.getElementById('toEncryptText')
    const toEncryptText = toEncryptTextArea.innerText

    if (!toEncryptText) {
        alert('Por favor digite um texto para ser codificado...')
        return
    }
    
    const encryptedBlocksArray = []
    
    let block, encryptedBlock = 0

    const primalPair = generatePrimalPair()

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