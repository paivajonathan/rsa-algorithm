import { getInverse } from './modularArithmeticUtils.js'
import { TotientFunction, DecryptedBlock } from './RSAUtils.js'
import { arrayJoin, arrayPush } from './arrayUtils.js'

export function decrypt(toDecryptTextDiv, privateKey1Input, privateKey2Input, encryptedTextP, decryptedTextP) {
    
    if (!toDecryptTextDiv.innerText) {
        alert('Por favor insira um RSA para ser decodificado...')
        return
    }

    const encryptedBlocksValuesArray = toDecryptTextDiv.innerText.split(' ')
    const decryptedBlocksValuesArray = []
    const decryptedCharArray = []
    
    const privateKey1Value = parseInt(privateKey1Input.value)
    const privateKey2Value = parseInt(privateKey2Input.value)
    const publicKey = privateKey1Value * privateKey2Value
    const totientFunction = new TotientFunction(privateKey1Value, privateKey2Value)

    const decryptingKey = getInverse(3, totientFunction.value)
    alert(`Chave para a decodificação: ${decryptingKey}`)

    for (let i = 0; i < encryptedBlocksValuesArray.length; i++) {
        const encryptedBlockValue = parseInt(encryptedBlocksValuesArray[i])

        const decryptedBlock = new DecryptedBlock(encryptedBlockValue, decryptingKey, publicKey)
        arrayPush(decryptedBlocksValuesArray, decryptedBlock.value)
    }
    
    for (let i = 0; i < decryptedBlocksValuesArray.length; i++) {
        const decryptedBlockValue = decryptedBlocksValuesArray[i]
        const charCode = decryptedBlockValue === 99 ? decryptedBlockValue - 67 : decryptedBlockValue + 55
        const char = String.fromCharCode(charCode)
        arrayPush(decryptedCharArray, char)
    }

    const decryptedText = arrayJoin(decryptedCharArray, '')

    encryptedTextP.innerText = ''
    privateKey1Input.value = ''
    privateKey2Input.value = ''
    toDecryptTextDiv.innerText = ''
    decryptedTextP.innerText = decryptedText
}