let num = /[^0-9]/g;
let vin = /[^a-zA-Z0-9]/g;

const OnlyNumbersMask = (e, item) => {

    switch (item) {
        case 'Пробег':
            if (e.target.value.length === 4) {
                return e.target.value = null
            }
            e.target.value = e.target.value.replace(num, '')
            if (e.target.value !== '') {
                return e.target.value + " км."
            }
            return
        case 'VIN':
            return e.target.value = e.target.value.replace(vin, '').toUpperCase()
        case 'Владельцев по ПТС':
            return e.target.value = e.target.value.replace(num, '')

        case 'Шины и диски':
            if (e.target.value.length === 2) {
                return e.target.value = null
            }
            e.target.value = e.target.value.replace(num, '')
            if (e.target.value !== '') {
                return e.target.value + " ”"
            }
            return
        default:
            break;
    }
}

const cursorReplace = (e, item) => {
    if (e.key === 'Backspace') {
        switch (item) {
            case 'Пробег':
                e.target.selectionStart = e.target.value.length
                if (e.target.value.length === 4) {
                    e.target.value = null
                }
                e.target.selectionEnd = (e.target.selectionEnd) - 4;
                return e.target.selectionEnd
            case 'Шины и диски':
                e.target.selectionStart = e.target.value.length
                if (e.target.value.length === 2) {
                    e.target.value = null
                }
                e.target.selectionEnd = (e.target.selectionEnd) - 2;
                return e.target.selectionEnd
            default:
                break;
        }
    }
}

export { OnlyNumbersMask, cursorReplace }