import React, { useState, useRef } from 'react';
// import Head from 'next/head'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { TextField } from '@material-ui/core';

const YandexMap = () => {

	//? Стартовые кординаты
	const [cordints, setCordints] = useState([55.185106, 61.332009])
	const [stateYmaps, setStateYmaps] = useState(false);
	const [value, setValue] = useState('');
	const test = useRef();


	const generateStr = (str, firstStr = false) => {
		const symbolStr = firstStr ? '' : ','
		console.log(str)
		const newStr = str ? symbolStr + str : ''
		return newStr
	}


	const changeAddress = () => {
		stateYmaps.geocode(cordints)
			.then((r) => {
				const adress = (r.geoObjects.get(0))

				console.log(
				adress.getAdministrativeAreas(), 
				adress.getLocalities(), 
				adress.getThoroughfare(),
          		adress.getPremiseNumber())

			    const newAdress = `${generateStr(adress.getLocalities()[0], true)}${generateStr(adress.getLocalities()[1])} ${generateStr(adress.getThoroughfare())}${generateStr(adress.getPremiseNumber())}`


				console.log(newAdress)

				if (newAdress == ' ' || newAdress.length == 0) {
					setValue(`${generateStr(adress.getAdministrativeAreas()[0], true)} ${generateStr(adress.getAdministrativeAreas()[1])}`)
					return;
				}

				setValue(newAdress)
			})
	}


	//? Функция следящая за инпутом
	const ymapsLoad = (ymaps) => {

		setStateYmaps(ymaps)


		//https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/control.SearchControl.html

		const searchControl = new ymaps.control.SearchControl({
			options: {
				provider: 'yandex#map'
			}
		})
		
		// https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/SuggestView.html?lang=ru
		// Находит инпут по id = suggest, создаёт выпадающую панель с поисковыми подсказками
		const inputCompele = new ymaps.SuggestView('suggest', {
			results: 5,
			// boundedBy: [[40.831318, 19.739210], [71.640153, -172.750744]]
		});


		inputCompele.events.add('select', (e) => {
			searchControl
				.search(e.get('item').value)
				.then((data) => {
					 setValue(e.get('item').value)
         			 setCordints(data.geoObjects.get(0).geometry.getCoordinates());
				})
				.catch((e) => console.log(e));
		})

		const behavior = new ymaps.behavior.Drag()


		
		console.log(behavior.events.add('enable', () => console.log(1)))
		
	}


	const handlerClick = (event) => {
		setCordints(event.get('coords'))
		changeAddress()
	}

	const hanlderBounds = (event) => {
		setCordints(event._cache.newCenter)
		// СТРАННО РАБОТАЕТ
		// setCordints(event.get('newCenter'))

		changeAddress()
	}

	const handlerActiontick = (event) => {
		console.log(event.originalEvent.tick)
	}
	

	return (
		<>	<TextField value={value} onChange={(e) => setValue(e.target.value)} ref={test} style={{width: '600px', margin: "20px 0"}} id="suggest" label="Адрес" variant="outlined" />
			  <YMaps query={{apikey: '57d4ea45-8f8c-4594-9c9b-03dbfcfab0e8'}}>
				  <div>
					<Map
					state={{ center: cordints, zoom: 14 }}
					onActiontick={handlerActiontick}
					onLoad={ymapsLoad}
					onClick={handlerClick}
					onBoundsChange={hanlderBounds}
					modules={["SuggestView", "control.SearchControl", "geocode", 'behavior.Drag']}
					width="100%"
					>
						<Placemark geometry={cordints} />
					</Map>
				  </div>
			  </YMaps>
		</>
		
	)
}

export default YandexMap;