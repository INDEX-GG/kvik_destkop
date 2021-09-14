import React from 'react';


const ProductWarning = ({status}) => {

	const warningArr = ['Неверная цена / Неверная категория / Невозможно дозвониться / Признаки дискриминации / Товар или услуга, запрещенные к продаже в РФ / В одном объявлении несколько предложений товаров и услуг /Использование одинаковых изображений в разных объявлениях / Контактная информация в названии, тексте объявления или на фото / Нарушение других правил Квик'];


	return (
		<p className="reason__rejection">
			Причина отклонения:{" "}
			<span>{warningArr[status]}</span>
		</p>
	)
}


export default ProductWarning;