const priceFormat = e => {
    let n = e.target.value
    n = +n.replace(/[^0-9]/g, '')
    let price = n.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })
    return price
 }
 
 const cursorReplace = e => {
    if (e.key === 'Backspace' && e.target.value.length >= 5) {
       return e.target.selectionEnd = e.target.selectionEnd - 2;
    }
 }

 export {priceFormat, cursorReplace}