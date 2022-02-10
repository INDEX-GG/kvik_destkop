import React from 'react';


// корректное склонение для оставшихся дней
function getNoun(number, one, two, five) {
	let n = Math.abs(number);
	n %= 100;
	if (n >= 5 && n <= 20) {
	  return five;
	}
	n %= 10;
	if (n === 1) {
	  return one;
	}
	if (n >= 2 && n <= 4) {
	  return two;
	}
	return five;
  }
  

const ProductDate = ({id, sellerId, date, mobile, leftDay = 0}) => {
	const correctDays = getNoun(leftDay, 'день', 'дня', 'дней')
	let divClass = id === sellerId ? "SellerInfoDate" : "SellerInfoDate_active"
	if (mobile) divClass = 'SellerInfoDate'
	return (
		sellerId ? 
		<>
			<div className={divClass}>Размещено {date}</div>
			{id == sellerId ? <span className="ad__block_top__days_left">Осталось {leftDay} {correctDays}</span> : null}
		</> : null
	)
}

export default ProductDate;