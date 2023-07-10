import { getInverse } from '../utils/modularArithmeticUtils.js'
import { TotientFunction, DecryptedBlock } from '../models/RSAModels.js'
import { arrayJoin, arrayPush } from '../utils/arrayUtils.js'
import { isPrimal } from '../utils/primalUtils.js'

export function decrypt(toDecryptTextArea, privateKey1Input, privateKey2Input, decryptedTextArea) {
    const toDecryptText = toDecryptTextArea.value

    if (toDecryptText === '') {
        alert('Por favor insira um RSA para ser decodificado...')
        return
    }

    const encryptedBlocksValuesArray = toDecryptTextArea.value.split(' ')
    const decryptedBlocksValuesArray = []
    const decryptedCharArray = []
    
    const privateKey1Value = parseInt(privateKey1Input.value)
    const privateKey2Value = parseInt(privateKey2Input.value)

    if (!isPrimal(privateKey1Value) || !isPrimal(privateKey2Value)) {
        alert('Insira números primos como valores das chaves!')
        return
    } else if (Number.isNaN(privateKey1Value) || Number.isNaN(privateKey2Value)) {
        alert('Lembre-se de inserir o valor de cada chave!')
        return
    }

    const publicKey = privateKey1Value * privateKey2Value
    const totientFunction = new TotientFunction(privateKey1Value, privateKey2Value)
    const decryptingKey = getInverse(3, totientFunction.value)
    
    if (decryptingKey === -1) {
        alert('Insira valores válidos!')
        return
    }

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

    privateKey1Input.value = ''
    privateKey2Input.value = ''
    toDecryptTextArea.value = ''
    decryptedTextArea.value = decryptedText
}