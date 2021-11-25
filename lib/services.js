import { STATIC_URL } from "./constants";

export function initials(str) {
    if (str !== undefined) {
        if (str.indexOf(' ') === -1) {
            return str.substr(0, 1);
        } else {
            return `${str.substr(0, 1)}${str.substr(str.indexOf(' ') + 1, 1)}`
        }
    }
}


export function stringToColor(str) {
    var hash = 0;
    var color = '#';
    var i;
    var value;
    var strLength;
    if (!str) {
        return color + '00A0AB';
    }
    strLength = str.length;
    for (i = 0; i < strLength; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (i = 0; i < 3; i++) {
        value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(12)).substr(-2);
    }
    return color;
}

export function brooklyn(num) {
    if (num !== undefined) {
        if (num > 99) {
            return '99+';
        } else if (num === 0 || num === '') {
            return '';
        } else {
            return num;
        }
    }
}

export function addZero(n) {
    if (n && n < 10) {
        return `0${n}`;
    } else {
        return n;
    }
}

export function standartDate(date) {
    const a = new Date(date),
        d = addZero(a.getDate()),
        m = addZero(a.getMonth() + 1),
        y = a.getFullYear();
    return (`${d}.${m}.${y}`)
}

export function ToFullDate(date) {
    const a = new Date(date),
        d = addZero(a.getDate()),
        m = addZero(a.getMonth() + 1),
        y = a.getFullYear(),
        h = a.getHours(),
        mi = a.getMinutes();
    return (`${d}.${m}.${y} ${h}.${mi}`)
}

export function ToRusDate(date) {
    const adDate = new Date(date),
        options = {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
    return adDate.toLocaleString("ru", options);
}

export function ToRusAccountDate(date) {
    const adDate = new Date(date),
        options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }
    return adDate.toLocaleString("ru", options);
}

export function ellipsis(string, count) {
    if (string?.length > count) {
        return (`${string.substr(0, (count - 1))}...`)
    } else {
        return (string)
    }
}

export function ToRubles(num) {
    num = +num;
    return num.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export function phoneNumber(num) {
    if (num && num.length === 11) {
        const number = `+${num.substr(0, 1)} (${num.substr(1, 3)}) ${num.substr(4, 3)} - ${num.substr(6, 2)} - ${num.substr(8, 2)}`;
        return number;
    } else {
        return num;
    }
}

export function typeChange(filename, type) {
    return filename.replace(/\.[^.]+$/, `.${type}`);
}

export async function getDataByQuery(url, query) {
    // console.log(process.env.BASE_URL)
    const response = await fetch(`${process.env.BASE_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
    const result = await response.json()
    return result;
}

export const isObjectEmpty = (obj) => {
    if (Object.keys(obj).length == 0) {
        return true;
    } else {
        return false;
    }
}

export const text2Bool = str => {
    if (str == 'true') {
        return true;
    } else {
        return false;
    }
}

export const checkArray = (arr) => {
    if (arr !== undefined && arr.length > 0) {
        return true
    } else {
        return false
    }
}


export const modifyGetPostsData = arr => {
    try {
        if(arr.photo === null){
            throw new Error('Есть оффер без фото')
        }


        if (arr?.length > 0) {
            return arr?.filter(item => item.photo !== null).map(item => {
                // console.log('Photo',JSON.parse(item.photo).photos)
                // console.log('PhotoLength',JSON.parse(item.photo).photos?.length)
                // ////////55555555555555555555
                // console.log('Photo.Photo',JSON.parse(item.photo).photos?.photos)
                // console.log('Photo.PhotoLength',JSON.parse(item.photo).photos?.photos?.length)
                return {
                    ...item,
                    photo: JSON.parse(item.photo).photos?.photos !== undefined
                        ? JSON.parse(item.photo).photos.photos?.map(item => `${STATIC_URL}/${item}`)
                        : JSON.parse(item.photo).photos?.map(item => `${STATIC_URL}/${item}`)
                }
            })
        }
    }
    catch (e){
        console.error(e.message)
    }


}

export const generateDataArr = (arr) => {
    const dataArr = arr.map(offer => {
        return {
            ...offer,
            photo: JSON.parse(offer.photo)?.photos.map(img => `${STATIC_URL}/${img}`)
        }
    })

    return dataArr
}


export const photos2arr = str => {
    return (JSON.parse(str))?.photos;
}

export const generateAliasStr = (str) => {
	return  str[0].toUpperCase() + str.substring(1,);
}


export const generateCity = (location, city = false) => {
    const data = location?.data;
    let fullCity = ''

    if (data) {
        const area = data.area ? `$${data.area}` : '';
        const city = data.city ? `$${data.city}` : '';
        const settlement = data.settlement ? `$${data.settlement}` : '';

        if (city !== '' || settlement !== '') {
            fullCity += `${data.country_iso_code}$${data.region_iso_code}${area}${city}${settlement}`
        } else {
            if (!city) {
                fullCity = undefined
            }
        }
    }

    if (fullCity === '' && !city) return undefined
    return fullCity
}