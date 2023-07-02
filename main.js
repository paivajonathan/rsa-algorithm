import { encrypt } from './scripts/encrypt.js'
import { decrypt } from './scripts/decrypt.js'
import { toUpperAndKeepAlphabets, keepNumbers } from './scripts/textAreaUtils.js'

document.getElementById('toEncryptText').addEventListener('keyup', function(event) {
    toUpperAndKeepAlphabets(event.target)
})

document.getElementById('encryptButton').addEventListener('click', function(event) {
    encrypt()
    event.target.blur()
})

document.querySelectorAll('input').forEach(key => {
    key.addEventListener('keyup', event => {
        keepNumbers(event.target)
    })
})

document.getElementById('toDecryptText').addEventListener('keyup', function(event) {
    keepNumbers(event.target)
})

document.getElementById('decryptButton').addEventListener('click', function(event) {
    decrypt()
    event.target.blur()
})

