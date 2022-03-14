export const checkTypeOf = (value, type) => typeof value === type

export const copyObject = (object) => JSON.parse(JSON.stringify(object))

export const checkValidArray = (arr) => Array.isArray(arr) && !!arr?.length

export const className = (...obj) => {
    return `${obj}`;
}

export const getTrueItemInObj = (obj) => {
    const trueArr = [];
    for (const [, value] of Object.entries(obj)) {
        if (value) trueArr.push(value);
    }
    return trueArr
}

export const sumArray = (arr, key) => {
    if (Array.isArray(arr)) {
        const onlyNumberArr = arr.map(item => key ? item[key] : item)
        const sumNumber = onlyNumberArr.reduce((prevValue, nextValue) => prevValue + nextValue, 0);
        return isNaN(sumNumber) ? 0 : sumNumber;
    }
};

export const parsePhoto = (photo, returnOne) => {
    if (typeof photo === 'string') {
        try {
            const {photos} = JSON.parse(photo)
            if (returnOne) return photos[0]
            return photos
        } catch (e) {
            console.log(e);
        }
    }

    return photo
}

export const stringSlice = (string, maxLength) => {
    if (typeof string === 'string') {
        const isMax = string.length > maxLength
        if (isMax) return `${string.slice(0, maxLength - 3).trim()}...`
        return string
    }
}

export const checkActiveClass = (state = false, defaultStyles, activeStyles) => {
    if (state) return [defaultStyles, ...activeStyles]
    if (!state) return `${defaultStyles}`
}

export const checkActiveString = (state = false, defaultString, activeString) => {
    if (state) return activeString
    if (!state) return defaultString
}

export const checkAlign = (align = 'center') => {
    switch(align){
        case 'left':
            return 'flex-start'
        case 'center':
            return 'center'
        case 'right':
            return 'flex-end'
        default:
            return 'center'
    }
}

export const checkEmptyNumber = (value) => {
    if(value === null || typeof value === 'undefined') return 0
    return value
}

export const stringArrayToNumberArray = (array) => {
    if (checkTypeOf(array, 'string')) {
        try {
            const parseArray = JSON.parse(array);
            return parseArray.map(item => +item);
        } catch (e) {
            console.log(e.message)
        }
    }
}

export const spliceArrayToTwoColum = (array) => {
    if (Array.isArray(array)) {
        const arrayLength = array.length
        const partOneLength = (arrayLength % 2 === 0 ? arrayLength : arrayLength + 1) / 2
        return [
            {column: copyObject(array).splice(0, partOneLength)},
            {column: copyObject(array).splice(partOneLength,)}
        ]
    }
}

/**
 *
 * • - Точка маркер списка
 *
 */
export const formatDescription = (description) => {
    const format = description
        // .replace('/<br/>/g', '\n')
        // .replace('/<br />/g', '\n')
        .replace(/<br>/g,"\n")
        .replace(/<br \/>/g,"\n")
        .replace(/<br\/>/g,"\n")

        .replace(/<ul\/>/g,"\n\r")
        .replace(/<ul \/>/g,"\n\r")

        .replace(/<\/ul>/g,"\n\r")
        .replace(/<\/ ul>/g,"\n\r")
        .replace(/<ul>/g,"\n\r")

        .replace(/<li\/>/g,"\n\r")
        .replace(/<li \/>/g,"\n\r")
        .replace(/<li>/g,"• ")

        .replace(/<\/li>/g,"")
        .replace(/<\/ li>/g,"")
        // .replace(/(?:\r\n|\r|\n)/g, '<br/>')
        // .replace(/(?:\r\n|\r|\n)/g, '<br />')
    // .replace(/<em.*?>(.*?)<\/em>/, `EM`) // <br/>
    // .replace(/<p.*?>(.*?)<\/p>/, `p`) // <br/>
    // .replace(/<strong.*?>(.*?)<\/strong>/, `s`) // <br/>
    // .replace(/<ol.*?>(.*?)<\/ol>/, `ol`) // <br/>
    // .replace(/<ul.*?>(.*?)<\/ul>/, `ul`) // <br/>
    // .replace(/<li.*?>(.*?)<\/li>/, `li`) // <br/>
    return format
}

/**
 * * Функция возвращает слово с необходимым окончанием из массива, по брейкоинту
 * Например, необходимо получить просклоняемое слово в зависимости от числа: '1 объявление', '2 объявления', '10 объявлений'
 *
 * !NOTICE -  длина declination и длина breakpoints должна быть равна
 * Для этого отправляем параметры ниже
 * {word} String наше слово без окончания
 * {number} Number число, по которому задаем окончание
 * {declination} Array окончаний
 * {breakpoints} Array точек, при которых меняется окончание
 *
 * returns {finalWord} String - наше просклоняемое слово
 */
export const wordAutoEnding = (word, number, declination, breakpoints) => {
    const requiredIndexBreakPoints = breakpoints.findIndex((bp, i, a) => number >= bp && number < (a[i + 1] || a[i]))
    const returnValue = number + ' ' + word

    if(requiredIndexBreakPoints === -1) return returnValue + declination[declination.length - 1]

    return returnValue + declination[requiredIndexBreakPoints]
}

export const getKeyArrayFilteredForObject = (obj) => {
    const keyResponse = Object.keys(obj)
    const arrayKeyResponsePost = keyResponse.filter(k => Array.isArray(obj[k]))

    return arrayKeyResponsePost
}
