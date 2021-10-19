import React, { useEffect, useRef } from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { useMedia } from '../../hooks/useMedia'

//!!!! ЕСЛИ БУДЕМ ИСПОЛЬЗОВАТЬ В МОБИЛЬНОМ ПРИЛОЖЕНИИ, ТО НУЖНО БУДЕТ СОБЛЮСТИ ПУНКТ 2.3.8
//!!! Пользователь обязуется разместить в своем мобильном приложении в разделе «О программе» или ином подобном разделе мобильного приложения, гиперссылку на Условия использования сервиса Яндекс.Карты, размещенные по адресу: https://yandex.ru/legal/maps_termsofuse, следующего вида - «Условия использования сервиса Яндекс.Карты».
const ProductYMAP = ({coordinates, width, height}) => {
	const ymapsLoad = () => {
		// console.log(ymaps)
	}

	const {matchesMobile, matchesTablet} = useMedia()
	const map = useRef()

	useEffect(() => {
		if (map.current) {
			map.current.panTo([+coordinates[0], +coordinates[1]], {
				delay: 10,
				duration: 0
			})
		}
	}, [coordinates])


	return (
		<YMaps query={{apikey: '5170655d-fb30-4cc1-b1aa-3782984b9fb8'}}>
			<div style={{borderRadius: '8px'}}>
				<Map 
				height={height}
				onLoad={ymapsLoad} 
				width={matchesMobile || matchesTablet ? '100%' : width} 
				instanceRef={map}
				defaultState={{ center: coordinates || [1, 1], zoom: 17 }} >
					<div>
						<Placemark geometry={coordinates} options={{
							iconLayout: "default#image",
							iconImageSize: [40, 40],
							iconImageHref: '/icons/Placemark.png'
						}}/>
					</div>
				</Map>
			</div>
		</YMaps>
	)
}

export default ProductYMAP