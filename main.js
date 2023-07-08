import { encrypt } from './scripts/encrypt.js'
import { decrypt } from './scripts/decrypt.js'
import { toUpperAndKeepAlphabets, keepNumbers } from './scripts/textAreaUtils.js'

const toEncryptTextDiv = document.getElementById('toEncryptText')
const encryptedTextP = document.getElementById('encryptedText')
const encryptButton = document.getElementById('encryptButton')
const privateKey1Input = document.getElementById('keyP')
const privateKey2Input = document.getElementById('keyQ')
const toDecryptTextDiv = document.getElementById('toDecryptText')
const decryptButton = document.getElementById('decryptButton')
const decryptedTextP = document.getElementById('decryptedText')

toEncryptTextDiv.addEventListener('keyup', function(event) {
    toUpperAndKeepAlphabets(event.target)
})

encryptButton.addEventListener('click', function(event) {
    encrypt(toEncryptTextDiv, encryptedTextP, privateKey1Input, privateKey2Input, toDecryptTextDiv)
    event.target.blur()
})

privateKey1Input.addEventListener('keyup', function(event) {
    keepNumbers(event.target)
})

privateKey2Input.addEventListener('keyup', function(event) {
    keepNumbers(event.target)
})

toDecryptTextDiv.addEventListener('keyup', function(event) {
    keepNumbers(event.target)
})

decryptButton.addEventListener('click', function(event) {
    decrypt(toDecryptTextDiv, privateKey1Input, privateKey2Input, encryptedTextP, decryptedTextP)
    event.target.blur()
})

