export class EncryptedBlock {
    constructor(blockValue, publicKey) {
        this.value = Math.pow(blockValue, 3) % publicKey
    }
}

export class TotientFunction {
    constructor(privateKey1, privateKey2) {
        this.value = (privateKey1 - 1) * (privateKey2 - 1)
    }
}

export class DecryptedBlock {
    constructor(encryptedBlockValue, decryptingKey, publicKey) {
        this.value = parseInt( BigInt( BigInt(encryptedBlockValue) ** BigInt(decryptingKey) ) % BigInt(publicKey) )
    }
}