import { generatePrimalPair } from "./primalUtils.js"
import { Block, EncryptedBlock } from './RSAUtils.js'

export function encrypt() {
    const toEncryptTextArea = document.getElementById('toEncryptText')
    const toEncryptText = toEncryptTextArea.innerText

    if (!toEncryptText) {
        alert('Por favor digite um texto para ser codificado...')
        return
    }

    const primalPair = generatePrimalPair()
    const privateKey1 = primalPair[0]
    const privateKey2 = primalPair[1]
    const publicKey = privateKey1 * privateKey2
    
    alert(`Chaves geradas: [${privateKey1}, ${privateKey2}] => ${privateKey1} * ${privateKey2} = ${publicKey}`);
    
    const encryptedBlocksValuesArray = []

    for (const char of toEncryptText) {
        const charCode = char.charCodeAt(0)
        const blockValue = char === ' ' ? charCode + 67 : charCode - 55
        const block = new Block(blockValue)

        const encryptedBlock = new EncryptedBlock(block.value, publicKey)
        encryptedBlocksValuesArray.push(encryptedBlock.value)
    }

    toEncryptTextArea.innerText = ''
    const encryptedText = encryptedBlocksValuesArray.join(' ')
    
    document.getElementById('encryptedText').innerText = encryptedText    
    document.getElementById('keyP').value = privateKey1
    document.getElementById('keyQ').value = privateKey2
    document.getElementById('toDecryptText').innerText = encryptedText
}