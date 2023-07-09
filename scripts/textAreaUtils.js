export function clearText(object) {
    object.value = ''
}

export function toUpperAndKeepAlphabets(object) {
    object.value = object.value.toUpperCase().replace(/[^A-Z ]/g, '')
}

export function keepNumbers(object) {
    object.value = object.value.replace(/[^0-9 ]/g, '')
}