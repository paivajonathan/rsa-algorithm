import { getRandomBetween } from './randomUtils.js'

export function isPrimal(n) {
    if (n > 1) {
        for (let i = 2; i < Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false
            }
        }
        return true
    } else {
        return false
    }
}

export function generatePrimalPair() {
    let n1, n2 = 0
    
    while (true) {
        n1 = getRandomBetween(10, 100)

        if (isPrimal(n1) && (n1 % 6 === 5)) break
    }

    while (true) {
        n2 = getRandomBetween(10, 100)

        if (isPrimal(n2) && (n2 % 6 === 5) && (n2 !== n1)) break
    }

    return [n1, n2]
}