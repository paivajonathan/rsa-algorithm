import { decrypt } from './decryptController.js'
import { clearText, keepNumbers } from './textAreaUtils.js'

const privateKey1Input = document.getElementById('keyP')
const privateKey2Input = document.getElementById('keyQ')
const toDecryptTextArea = document.getElementById('toDecryptText')
const decryptClearButton = document.getElementById('decryptClearButton')
const decryptButton = document.getElementById('decryptButton')
const decryptedTextArea = document.getElementById('decryptedText')

privateKey1Input.addEventListener('keyup', function(event) {
    keepNumbers(event.target)
})

privateKey2Input.addEventListener('keyup', function(event) {
    keepNumbers(event.target)
})

toDecryptTextArea.addEventListener('keyup', function(event) {
    keepNumbers(event.target)
})

decryptedTextArea.addEventListener('click', function(event) {
    const text = event.target.value
    if (text === '') return

    navigator.clipboard.writeText(text).then(() => {
        alert('Texto copiado para a área de transferência!')
    })
})

decryptClearButton.addEventListener('click', function(event) {
    clearText(toDecryptTextArea)
    clearText(decryptedTextArea)
    event.target.blur()
})

decryptButton.addEventListener('click', function(event) {
    decrypt(toDecryptTextArea, privateKey1Input, privateKey2Input, decryptedTextArea)
    event.target.blur()
})

