export function arrayJoin(array, joiningCharacter) {
    let text = ''

    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            text += `${array[i]}`
        } else {
            text += `${joiningCharacter}${array[i]}`
        }
    }

    return text
}

export function arrayPush(array, pushingItem) {
    const position = array.length
    array[position] = pushingItem
}