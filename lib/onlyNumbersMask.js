import { num, vin } from "./regulars";

const OnlyNumbersMask = (e, item) => {

    switch (item) {
        case 'Пробег':
            if (e.target.value.length === 4) {
                return e.target.value = null
            }
            e.target.value = e.target.value.replace(num(), '')
            if (e.target.value !== '') {
                return e.target.value + " км."
            }
            return
        case 'VIN':
            return e.target.value = e.target.value.replace(vin(), '').toUpperCase()
        case 'Владельцев по ПТС':
            return e.target.value = e.target.value.replace(num(), '')

        case 'Шины и диски':
            if (e.target.value.length === 2) {
                return e.target.value = null
            }
            e.target.value = e.target.value.replace(num(), '')
            if (e.target.value !== '') {
                return e.target.value + " ”"
            }
            return
        // case "Год выпуска": 
        //     if (e.target.value.length >= 4){
        //         return e.target.value = e.target.value.slice(0,4)
        //     }
        //     if (e.target.value) {
        //         if (e.target.value.length === 1){
        //             const num = e.target.value;
        //             const state = +num === 1 || +num === 2
        //             console.log(state);
        //             return e.target.value = state ? num : null
        //         }
        //         if (e.target.value.length === 2){
        //             const num = e.target.value;
        //             const state = +num === 19 || +num === 20
        //             console.log(state);
        //             return e.target.value = state ? num : e.target.value.slice(0,1)
        //         }
        //         if (e.target.value.length === 3){
        //             const num = e.target.value;
        //             const state = +num >= 195 && +num <= 202
        //             console.log(+num);
        //             return e.target.value = state ? num : e.target.value.slice(0,2)
        //         }
        //     }
        //     return
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
