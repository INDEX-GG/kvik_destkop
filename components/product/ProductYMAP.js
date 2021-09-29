import React, { useEffect, useRef } from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { useMedia } from '../../hooks/useMedia'


const ProductYMAP = ({coordinates, width, height}) => {
	const ymapsLoad = (ymaps) => {
		console.log(ymaps)
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
		<YMaps>
			<div>
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