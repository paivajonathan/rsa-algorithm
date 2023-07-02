import { getInverse } from "./modularArithmeticUtils.js"
import { TotientFunction, DecryptedBlock } from './RSAUtils.js'

export function decrypt() {
    const toDecryptTextArea = document.getElementById('toDecryptText')
    if (!toDecryptTextArea.innerText) {
        alert('Por favor insira um RSA para ser decodificado...')
        return
    }

    const encryptedBlocksValuesArray = toDecryptTextArea.innerText.split(' ')
    const decryptedBlocksValuesArray = []
    const decryptedCharArray = []
    
    const privateKey1 = parseInt(document.getElementById('keyP').value)
    const privateKey2 = parseInt(document.getElementById('keyQ').value)
    const publicKey = privateKey1 * privateKey2

    const decryptingKey = getInverse(3, new TotientFunction(privateKey1, privateKey2).value)
    alert(`Chave para a decodificação: ${decryptingKey}`)

    for (const encryptedBlockValue of encryptedBlocksValuesArray) {
        const decryptedBlock = new DecryptedBlock(encryptedBlockValue, decryptingKey, publicKey)
        decryptedBlocksValuesArray.push(decryptedBlock.value)
    }
    
    for (const decryptedBlockValue of decryptedBlocksValuesArray) {
        const charCode = decryptedBlockValue === 99 ? decryptedBlockValue - 67 : decryptedBlockValue + 55
        const char = String.fromCharCode(charCode)
        decryptedCharArray.push(char)
    }

    const decryptedText = decryptedCharArray.join('')

    document.getElementById('encryptedText').innerText = ''
    document.getElementById('keyP').value = ''
    document.getElementById('keyQ').value = ''
    toDecryptTextArea.innerText = ''
    document.getElementById('decryptedText').innerText = decryptedText
}