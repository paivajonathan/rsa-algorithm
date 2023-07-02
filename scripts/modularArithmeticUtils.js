export function getInverse(n, mod) {
    for (let i = 1; i < mod; i++) {
        if ( (n*i) % mod === 1 ) return i
    }
    return -1
}