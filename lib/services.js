function initials(str) {
	if (str !== undefined) {
		if (str.indexOf(' ') === -1) {
			return stringToColor.substr(0, 1);
		} else {
			return `${str.substr(0, 1)}${str.substr(str.indexOf(' ') + 1, 1)}`
		}
	}
}

function stringToColor(str) {
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
};

function brooklyn(num) {
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

function addZero(n) {
    if (n && n < 10) {
        return `0${n}`;
    } else {
        return n;
    }
}

function standartDate(date) {
    const a = new Date(date),
        d = addZero(a.getDate()),
        m = addZero(a.getMonth() + 1),
        y = a.getFullYear();
    return (`${d}.${m}.${y}`)
}

function ToFullDate(date) {
    const a = new Date(date),
        d = addZero(a.getDate()),
        m = addZero(a.getMonth() + 1),
        y = a.getFullYear(),
        h = a.getHours(),
        mi = a.getMinutes();
    return (`${d}.${m}.${y}.${h}.${mi}`)
}

function ToRusDate(date) {
    const adDate = new Date(date),
        options = {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
    return adDate.toLocaleString("ru", options);
}

function ToRusAccountDate(date) {
    const adDate = new Date(date),
        options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }
    return adDate.toLocaleString("ru", options);
}

function ellipsis(string, count) {
    if (string.length > count) {
        return (`${string.substr(0, (count - 1))}...`)
    } else {
        return (string)
    }
};

function ToRubles(num) {
    num = +num;
    return num.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function phoneNumber(num) {
    if (num && num.length === 11) {
        const number = `+${num.substr(0, 1)} (${num.substr(1, 3)}) ${num.substr(4, 3)} - ${num.substr(6, 2)} - ${num.substr(8, 2)}`;
        return number;
    } else {
        return num;
    }
}

function typeChange(filename, type) {
    return filename.replace(/\.[^.]+$/, `.${type}`);
}

async function getDataByQuery(url, query) {
    console.log(process.env.URL_HOST)
    const response = await fetch(`${process.env.URL_HOST}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
    const result = await response.json()
    return result;
}

const isObjectEmpty = (obj) => {
	if (Object.keys(obj).length == 0) {
		return true;
	} else {
		return false;
	}
}

export { initials, stringToColor, brooklyn, standartDate, addZero, ellipsis, ToRubles, ToRusDate, ToFullDate, ToRusAccountDate, phoneNumber, typeChange, getDataByQuery, isObjectEmpty };