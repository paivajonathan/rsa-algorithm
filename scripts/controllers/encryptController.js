import { generatePrimalPair } from '../utils/primalUtils.js'
import { EncryptedBlock } from '../models/RSAModels.js'
import { arrayJoin, arrayPush } from '../utils/arrayUtils.js'

export function encrypt(toEncryptTextArea, encryptedTextArea) {
    const toEncryptText = toEncryptTextArea.value

    if (toEncryptText === '') {
        alert('Por favor digite um texto para ser codificado...')
        return
    }

    const primalPair = generatePrimalPair()
    const privateKey1 = primalPair[0]
    const privateKey2 = primalPair[1]
    const publicKey = privateKey1 * privateKey2
    
    alert(`Chaves geradas: [${privateKey1}, ${privateKey2}] => ${privateKey1} * ${privateKey2} = ${publicKey}`);
    
    const blocksValuesArray = []
    const encryptedBlocksValuesArray = []

    for (let i = 0; i < toEncryptText.length; i++) {
        const char = toEncryptText[i]
        const charCode = char.charCodeAt(0)
        const blockValue = char === ' ' ? charCode + 67 : charCode - 55
        arrayPush(blocksValuesArray, blockValue)
    }

    for (let i = 0; i < blocksValuesArray.length; i++) {
        const blockValue = blocksValuesArray[i]
        const encryptedBlock = new EncryptedBlock(blockValue, publicKey)
        arrayPush(encryptedBlocksValuesArray, encryptedBlock.value)
    }

    toEncryptTextArea.value = ''
    const encryptedText = arrayJoin(encryptedBlocksValuesArray, ' ')
    
    encryptedTextArea.value = encryptedText
}