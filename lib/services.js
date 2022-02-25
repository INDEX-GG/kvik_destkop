import {STATIC_URL} from "./constants";
import axios from "axios";

/**
 * @param {string} str
 * @returns {string}
 */
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

/**
 * @param {number} num
 */
export const brooklyn = (num) => {
    if (!num) {
        return '';
    }

    if (num > 99) {
        return '99+';
    }

    return String(num);
}

export function   addZero(n) {
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
        h = addZero(a.getHours()),
        mi = addZero(a.getMinutes());
    return (`${d}.${m}.${y} ${h}:${mi}`)
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
    return num.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })
}

/**
 * @param {number} num
 * @returns {string}
 */
export function phoneNumber(num) {
    if (num && num.length === 11) {
        const number = `+${num.substr(0, 1)} (${num.substr(1, 3)}) ${num.substr(4, 3)} - ${num.substr(6, 2)} - ${num.substr(8, 2)}`;
        return number;
    } else {
        return String(num);
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

/**
 * @param {[]} arr
 */
export const checkArray = (arr) => {
    if (arr !== undefined && arr.length > 0) {
        return true
    } else {
        return false
    }
}


export const modifyGetPostsData = arr => {
    try {
        // if (arr.photo === null) {
        //     throw new Error('Есть оффер без фото')
        // }

        console.log('arr: ', arr)

        if (arr?.length > 0) {
            // const filtered_arr = arr?.filter(item => item.photo !== null).map(item => {
                return arr?.map(item => {
                // console.log('Photo',JSON.parse(item.photo).photos)
                // console.log('PhotoLength',JSON.parse(item.photo).photos?.length)
                // ////////55555555555555555555
                // console.log('Photo.Photo',JSON.parse(item.photo).photos?.photos)
                // console.log('Photo.PhotoLength',JSON.parse(item.photo).photos?.photos?.length)
                console.log('item: ', item)

                return {
                    ...item,
                    photo: item.photo !== null ?
                        JSON.parse(item.photo).photos?.photos !== undefined
                            ? JSON.parse(item.photo).photos.photos?.map(item => `${STATIC_URL}/${item}`)
                            : JSON.parse(item.photo).photos?.map(item => `${STATIC_URL}/${item}`)
                        : null
                }
            })
        }
    } catch (e) {
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
    return str[0].toUpperCase() + str.substring(1,);
}


export const generateSearchName = (location, city = false) => {
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


export const generateCityObj = (suggestion) => {
    let fullCity = ''
    const data = suggestion.data
    const area = data.area ? `$${data.area}` : '';
    const city = data.city ? `$${data.city}` : '';
    const settlement = data.settlement ? `$${data.settlement}` : '';
    fullCity += `${data.country_iso_code}$${data.region_iso_code}${area}${city}${settlement}`
    const geo = [data.geo_lat, data.geo_lon]
    const name = suggestion.value

    return {name: name, geo: geo, searchName: fullCity}
}


export const fetchCity = async (generateCity) => {
    const resIp = await axios.get('https://api.ipify.org/?format=jsonp&callback=getIP')
        .then(r => r.data)
        .catch(() => undefined)
    if (resIp) {
        const inpStrIndex = [resIp.indexOf('{'), resIp.indexOf('}')]
        const userIp = JSON.parse(resIp.substring(inpStrIndex[0], inpStrIndex[1] + 1))?.ip
        if (userIp) {
            const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
            const token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222";
            const query = userIp
            const options = {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                }
            }
            fetch(url + query, options)
                .then(response => response.text())
                .then(result => generateCity(JSON.parse(result), userIp))
                .catch(error => console.log("error", error));
        }
    } else {

        const cityObj = {
            name: "Москва",
            searchName: "RU$RU-MOW$Москва",
            geo: [55.755826, 37.6173]
        }

        localStorage.setItem('cities', JSON.stringify(cityObj))

        return cityObj
    }
}

export const generateAdditionalFields = (data) => {

    const arr = []

    console.log(data);
    for (const [key, value] of Object.entries(data)) {
        if (key === 'title'
            || key === 'description'
            || key === 'price'
            || key === 'trade'
            || key === 'location'
            || key === 'bymessages'
            || key === 'byphone'
            || key === 'city'
            || key === 'coordinates'
            || key === 'alias'
            || key === 'user_id'
            || key === 'contact') {
            continue
        }

        const sendObj = {}

        if (key) {
            sendObj.alias = key


        if (typeof value == 'object') {
            sendObj.value = value?.value ? 1 : 0
        } else {
            sendObj.value = isNaN(+value) ? value : +value
        }
        }


        arr.push(sendObj);
    }

    return arr
}

// ProductTitle
export const generateTitle = (title, obj, getValues) => {
    if (Array.isArray(obj?.title)) {

        let newTitle = ''

        for (let i = 0; i < obj.title.length; i++) {
            newTitle += `${getValues(obj.title[i])} `
        }
        console.log(newTitle)
        return newTitle
    }

    return title
}

// Создание region_includes / region_excludes в запросе (ScrollPostData / CategoryScrollPostData)
export const generateCityArr = (action, searchCity, excludesLength) => {
    const sarchCityArr = searchCity?.split('$');

    if (action === 'includes') {
        return sarchCityArr.splice(0, sarchCityArr.length - excludesLength + 1).join('$')
    }

    if (action === 'excludes') {
        return excludesLength > 1 ? sarchCityArr.splice(0, sarchCityArr.length - excludesLength + 2).join('$') : '';
    }
}

export const generateActive = (item, currentValue) => {
    return item === currentValue
}

export const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

export const getLastElementArr = (string, splitItem) => {
    const arr = string.split(splitItem)
    return arr[arr.length - 1]
}

/**
 * Функция возварщает IP текущего пользователя по запросу на сервис geolocation
 * @returns IPv4 (String) || null
 */
export const getIPv4Addres = async () => {
    const resIP = await axios.get('https://geolocation-db.com/json/')
        .then(r => r.data)
        .catch(() => undefined)
    let ip = null
    if(resIP) {
        ip = resIP.IPv4
    }

    return ip
}

/**
 * Функция возварщает ОС текущего пользователя из UserAgent
 * !NOTICE: UserAgent ненадежный вариант получения платформы пользователя
 * @returns OSPlatform (String)
 */
export const getOSPlatform = () => {
    const userDeviceArray = [
        {device: 'Android', platform: /Android/},
        {device: 'iPhone', platform: /iPhone/},
        {device: 'iPad', platform: /iPad/},
        {device: 'Symbian', platform: /Symbian/},
        {device: 'Windows Phone', platform: /Windows Phone/},
        {device: 'Tablet OS', platform: /Tablet OS/},
        {device: 'Linux', platform: /Linux/},
        {device: 'Windows', platform: /Windows NT/},
        {device: 'Macintosh', platform: /Macintosh/}
    ];

    // получает информацию вида
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0
    const platform = navigator.userAgent

    for (var i in userDeviceArray) {
        if (userDeviceArray[i].platform.test(platform)) {
            return userDeviceArray[i].device;
        }
    }
    return 'Неизвестная платформа!' + platform;
}
