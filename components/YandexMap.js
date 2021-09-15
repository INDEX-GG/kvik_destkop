import React, { useState, useRef, memo, useMemo, useEffect } from 'react';
import { YMaps, Map, withYMaps } from 'react-yandex-maps'
import { TextField } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
// import {useCity} from '../lib/Context/CityCTX'
import { useMedia } from '../hooks/useMedia'


const Location = memo(({ymaps}) => {
	// Кординаты
	const [coordinates, setCoordinates] = useState([55.753220, 37.622513])
	// value инпута
	const [value, setValue] = useState('');
	// boolean - изменяется при движении карты
	const [mapMove, setMapMove] = useState(false)
	// boolean - определяет будут ли показываться посказки в input
	const [suggestView, setSuggestView] = useState(false)
	// object - подсказки
	const [suggest, setSuggest] = useState('')
	// карта
	const map = useRef()

	const {matchesMobile} = useMedia()
	// const {city} = useCity()


	const generateStr = (str, first = false) => {
		const symbol = first ? '' : ', '
		const newStr = str ? symbol + str : ''
		return newStr;
	}

	const changeAddress = (coord) => {
		// определение адреса по координатам
		ymaps.geocode(coord)
			.then((r) => {
				// объект адреса
				const adress = (r.geoObjects.get(0))
				// намер дома
				const number = generateStr(adress.getPremiseNumber())
				// название улицы
				const thoroughfare =  generateStr(adress.getThoroughfare())
				// название района
				const getLocalities1 = generateStr(adress.getLocalities()[1])
				// название города
				const getLocalities = generateStr(adress.getLocalities()[0], true)

				// полный адресс
				const newAddress = `${getLocalities}${getLocalities1}${thoroughfare}${number}`

				// поверка на гобальную карту (если сильно отдалиться от города)
				if (newAddress == '') {
					const globalAddress = generateStr(adress.getAdministrativeAreas()[0], true)
					const globalAddress2 = generateStr(adress.getAdministrativeAreas()[1])
					const newGlobalAdress = `${globalAddress}${globalAddress2}`
					setValue(newGlobalAdress)
					return;
				}
				setValue(newAddress)
			})
	}

	const hintsInput = (submit) => {

		// если должны появиться посказки в input, то мы их убираем
		if (suggest) suggest.destroy()


		// Следим за inputom
		const searchControl = new ymaps.control.SearchControl({
			options: {
				provider: 'yandex#map',
				size: 'small'
			}
		})

		// Добовляем посказки в input
		const inputCompele = new ymaps.SuggestView('suggest', {
			results: 3,
		});

		setSuggest(inputCompele)

		// событие onSubmit
		if (submit) {
			searchControl
				.search(value)
				.then((data) => {
					// setValue(value)
         			setCoordinates(data.geoObjects.get(0).geometry.getCoordinates());
					inputCompele.destroy();
					setSuggestView(false)
				})
				.catch((e) => console.log(e));
			return;
		} else {
			inputCompele.events.add('select', (e) => {
				searchControl
					.search(e.get('item').value)
					.then((data) => {
						setValue(e.get('item').value)
						setCoordinates(data.geoObjects.get(0).geometry.getCoordinates());
						inputCompele.destroy();
						setSuggestView(false)
					})
					.catch((e) => console.log(e));
			})
		}
	}


	//? Функция следящая за инпутом
	const ymapsLoad = () => {
		hintsInput()
		changeAddress(coordinates)

		const Balloon = map.current.balloon;

		Balloon.events.add("open", () => {
			setMapMove(false);
			// Balloon.autoPan()
			Balloon.close(true);
		});

		
		ymaps.geolocation.get({ provider: "yandex", mapStateAutoApply: true, timeout: 0 })
			.then(res =>
				ymaps.geocode(res.geoObjects.position).then(r => {
					const adress = (r.geoObjects.get(0))
					const number = generateStr(adress.getPremiseNumber())
					const thoroughfare =  generateStr(adress.getThoroughfare())
					const getLocalities1 = generateStr(adress.getLocalities()[1])
					const getLocalities = generateStr(adress.getLocalities()[0], true)

					const newAddress = `${getLocalities}${getLocalities1}${thoroughfare}${number}`

					setValue(newAddress)
					setCoordinates(res.geoObjects.position)
				})
			)
			.catch((e) => {
				// ymaps.geocode(city).then(r => {
				// 	const adress = (r.geoObjects.get(0))
				// 	const number = generateStr(adress.getPremiseNumber())
				// 	const thoroughfare =  generateStr(adress.getThoroughfare())
				// 	const getLocalities1 = generateStr(adress.getLocalities()[1])
				// 	const getLocalities = generateStr(adress.getLocalities()[0], true)

				// 	const newAddress = `${getLocalities}${getLocalities1}${thoroughfare}${number}`

				// 	setValue(newAddress)
				// })
				console.log(e)
			})
	}

	const handlerClick = (event) => {
		setMapMove(true)
		map.current.panTo(event.get('coords'), {
			delay: 10,
			duration: 300
		})
		  .then(() => setMapMove(false))
		changeAddress(event.get('coords'))
	}

	const hanlderBounds = (event) => {
		map.current.panTo(event.get('newCenter'), {
			delay: 10,
			duration: 300
		})
		  .then(() => setMapMove(false))
		changeAddress(event.get('newCenter'))
	}

	const handlerChange = (event) => {
		setValue(event.target.value)
		setSuggestView(true)
	}

	const handlerSubmit = (e) => {
		e.preventDefault()
		hintsInput(true)
	}

	useEffect(() => {
		if (suggestView) {
			console.log(1)
			hintsInput()
		}
	}, [suggestView])

	return (
		<div style={{maxWidth: '490px', width: '100%'}}>
			<form onSubmit={handlerSubmit}>
				<TextField value={value} onChange={handlerChange} style={{width: '100%', margin: "20px 0"}} placeholder='Введите город, улицу, дом' id="suggest" variant="outlined" />
			</form>
			<div style={{position: 'relative'}}>
				<Map
				instanceRef={map}
				state={{ 
					center: coordinates, 
					zoom: 17
				}}
				onMouseDown={() => {
					setMapMove(true)
				}}
				onLoad={ymapsLoad}
				onClick={handlerClick}
				onBoundsChange={hanlderBounds}
				modules={["SuggestView", "control.SearchControl", "geocode", 'geolocation', 'Balloon']}
				height={224}
				width={matchesMobile ? '100%' : 490}
				>
					{/* <Placemark geometry={coordinates} /> */}
					<RoomIcon color='primary' style={{position: 'absolute', zIndex: '1', left: '50%', transform: 'translateX(-50%)', top: `${mapMove ? '60px' : '70px'}`, transition: '.2s all linear', fontSize: '50px'}}/>
				</Map>
			</div>
		</div>
	)

})


const YandexMap = () => {
	const MainMap = useMemo(() => {
    	return withYMaps(Location, true);
  	}, []);

	return (
		<>
			<YMaps query={{apikey: '57d4ea45-8f8c-4594-9c9b-03dbfcfab0e8'}}>
				<MainMap/>
			</YMaps>
		</>
		
	)
}

export default YandexMap;