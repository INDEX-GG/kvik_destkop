import {generateCheckboxTime} from "#lib/utils/checkBoxFunction";

export const findJsonPlaceOfferItem = (arr, search) => {
    if (Array.isArray(arr)) {
       return  arr.find(item => item.alias === search)
    }
}


export const getAdditionalFields = (data, alias) => {
    if (Array.isArray(data) && alias) {

        const aliasArr = alias.split(',')
        let intervalArr = null

        if (aliasArr.length && Array.isArray(aliasArr)) {
            for (let i = 0; i < aliasArr.length; i++) {

                const aliasName = aliasArr[i]

                if (intervalArr) {
                    if (intervalArr?.children) {
                        intervalArr = findJsonPlaceOfferItem(intervalArr.children, aliasName);
                    } else {
                        intervalArr = findJsonPlaceOfferItem(intervalArr, aliasName)
                    }

                } else {
                    intervalArr = data.find(item => item.alias === aliasName)
                }
            }
        }


        return intervalArr;
    }
}

const generateFromTo = (obj, key, value) => {
    const minMaxObj = {}
    const [state, alias] = key.split('$')

    if (state === 'to') {
        const fromValue = obj[`from$${alias}`]

        if (fromValue) {
            minMaxObj[alias] = {min: fromValue, max: value}
        } else {
            minMaxObj[alias] = {min: null, max: value}
        }
    }

    if (state === 'from') {
        minMaxObj[alias] = {min: value, max: null}
        const toValue = obj[`to$${alias}`]

        if (toValue) {
            minMaxObj[alias] = {min: value, max: toValue}
        } else {
            minMaxObj[alias] = {min: value, max: null}
        }
    }

    return minMaxObj[alias]
}


export const generateFilterData = (obj) => {
    const dataObj = {check: {}}

    for (let [key, value] of Object.entries(obj)) {
        if (value) {
            // Исплючение срок размещения
            if (key === 'time') {
                dataObj[key] = generateCheckboxTime(value);
                continue
            }

            // Исключение цена
            if (key.split('$')[1] === 'price') {
                dataObj[key.split('$')[1]] = generateFromTo(obj, key, value)
                continue
            }


            if (typeof value === 'string') {
                if (key.includes('$')) {
                    dataObj.check[key.split('$')[1]] = generateFromTo(obj, key, value)
                } else {
                    dataObj.check[key] = value
                }
            }

            if (typeof value === 'object' && !Array.isArray(value)) {
                dataObj.check[key] = value.data
            }

            if (Array.isArray(value) & value.length) {
                dataObj.check[key] = value
            }
        }
    }

    return dataObj
}