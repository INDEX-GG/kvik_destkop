const priceFormat = e => {
   	let n = e.target.value
	   if (n == '' || n == ' ₽') {
		   n = '0';
	   }
   	n = n.replace(/[^0-9]/g, '')
   	n = Math.max(0, parseInt(n)).toString().slice(0,8)
	n = +n;
   	let price = n.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })
   	if (n === 0) {
      	return '';
   	} else {
      	return price
   	}
}

const cursorReplace = e => {
   if (e.key === 'Backspace') {
	   if (e.target.value == 'не число ₽') {
		return e.target.value = '00'
	   }
      return e.target.selectionEnd = e.target.selectionEnd - 2;
   }
}

export { priceFormat, cursorReplace }