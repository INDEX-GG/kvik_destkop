export const getTrueItemInObj = (obj) => {
    const trueArr = [];
    for (const [, value] of Object.entries(obj)) {
        if (value) trueArr.push(value);
    }
    return trueArr
}

export const sumArray = (arr, key) => {
    if (Array.isArray(arr)) {
        const onlyNumberArr = arr.map(item => item[key])
        const sumNumber = onlyNumberArr.reduce((prevValue, nextValue) => prevValue + nextValue, 0);
        return isNaN(sumNumber) ? 0 : sumNumber;
    }
};
