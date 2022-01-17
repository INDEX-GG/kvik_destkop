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