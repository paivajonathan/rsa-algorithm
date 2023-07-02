export function setTextCursorOnEnd(object) {
    if (object.tagName !== 'TEXTAREA' && object.getAttribute('contenteditable') === 'true') {
        object.focus()
        window.getSelection().selectAllChildren(object)
        window.getSelection().collapseToEnd()
    } else {
        object.focus()
        object.select()
        window.getSelection().collapseToEnd()
    }
}

export function toUpperAndKeepAlphabets(object) {
    object.innerText = object.innerText.toUpperCase().replace(/[^A-Z ]/g, '')
    setTextCursorOnEnd(object)
}

export function keepNumbers(object) {
    object.innerText = object.innerText.replace(/[^0-9 ]/g, '')
    setTextCursorOnEnd(object)
}