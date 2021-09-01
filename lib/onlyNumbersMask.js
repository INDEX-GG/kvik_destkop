let num = /[^0-9]/g;
let vin = /[^aA-zZ0-9]+$/g;

const OnlyNumbersMask = (e, item) => {
    console.log(item)
    console.log(e.target.value.value)

    switch (item) {
        case 'Пробег':
            e.target.value = e.target.value.replace(num, '')
            return e.target.value + " км."

        case 'VIN':
            return e.target.value = e.target.value.replace(vin, '').toUpperCase()
        case 'Владельцев по ПТС':
            return e.target.value = e.target.value.replace(num, '')
        default:
            break;

    }







}

const cursorReplace = (e, item) => {
    if (e.key === 'Backspace') {
        switch (item) {
            case 'Пробег':
                e.target.selectionStart = e.target.value.length
                if (e.target.value.length === 5) {
                    e.target.value = ''
                }
                e.target.selectionEnd = (e.target.selectionEnd) - 4;
                return e.target.selectionEnd
            default:
                break;
        }
    }
}

export { OnlyNumbersMask, cursorReplace }