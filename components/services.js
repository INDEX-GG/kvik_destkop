function initials() {
    return this.substr(0, 1);
}

function stringToColor() {
    var hash = 0;
    var color = '#';
    var i;
    var value;
    var strLength;
    if (!this) {
        return color + '00A0AB';
    }
    strLength = this.length;
    for (i = 0; i < strLength; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (i = 0; i < 3; i++) {
        value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
};

function brooklyn() {
    if (this > 99) {
        return '99+';
    } else if (this === 0 || this === '') {
        return '';
    } else {
        return this;
    }
}
Number.prototype.brooklyn = brooklyn;
String.prototype.initials = initials;
String.prototype.toColor = stringToColor;

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

function ellipsis(string, count) {
    if (string.length > count) {
        return (`${string.substr(0, (count - 1))}...`)
    } else {
        return (string)
    }
};

function ToRubles(num) {
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

export { initials, stringToColor, brooklyn, standartDate, addZero, ellipsis, ToRubles, ToRusDate, phoneNumber, typeChange };