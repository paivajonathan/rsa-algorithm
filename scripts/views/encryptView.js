import { encrypt } from '../controllers/encryptController.js'
import { clearText, toUpperAndKeepAlphabets } from '../utils/textAreaUtils.js'

const toEncryptTextArea = document.getElementById('toEncryptText')
const encryptedTextArea = document.getElementById('encryptedText')
const encryptClearButton = document.getElementById('encryptClearButton')
const encryptButton = document.getElementById('encryptButton')

toEncryptTextArea.addEventListener('keyup', function(event) {
    toUpperAndKeepAlphabets(event.target)
})

encryptedTextArea.addEventListener('click', function(event) {
    const text = event.target.value
    if (text === '') return

    navigator.clipboard.writeText(text).then(() => {
        alert('Texto copiado para a área de transferência!')
    })
})

encryptClearButton.addEventListener('click', function(event) {
    clearText(toEncryptTextArea)
    clearText(encryptedTextArea)
    event.target.blur()
})

encryptButton.addEventListener('click', function(event) {
    encrypt(toEncryptTextArea, encryptedTextArea)
    event.target.blur()
})