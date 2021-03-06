// import React, { useState, useRef, memo, useMemo, useEffect } from 'react';
// import { YMaps, Map, withYMaps } from 'react-yandex-maps'
// import { TextField } from '@material-ui/core';
// // import {useCity} from '../lib/Context/CityCTX'
// import { useMedia } from '../hooks/useMedia'
// import CustomPlacemark from '../UI/icons/Placemark';
// import { makeStyles } from '@material-ui/core';
// import { Controller, useFormContext } from 'react-hook-form';
// import { invalidСharacterLocation } from '../lib/regulars';
//
//
// const useStyles = makeStyles(() => ({
// 	inputMap: {
// 		width: '100%',
// 		margin: '20px 0'
// 	},
// 	placemarkBlock: {
// 		position: 'absolute',
// 		zIndex: '1',
// 		left: '50%',
// 		transform: 'translateX(-50%)',
// 		transition: '.2s all linear'
// 	}
// }))
//
//
// const Location = memo(({ymaps, setData}) => {
// 	// Кординаты
// 	const [coordinates, setCoordinates] = useState([55.753220, 37.622513])
// 	// Зум карты
// 	const [zoom, setZoom] = useState(17)
// 	// value инпута
// 	const [value, setValue] = useState('');
// 	// boolean - изменяется при движении карты
// 	const [mapMove, setMapMove] = useState(false)
// 	// boolean - определяет будут ли показываться посказки в input
// 	const [suggestView, setSuggestView] = useState(false)
// 	// object - подсказки
// 	const [suggest, setSuggest] = useState('')
//
// 	const [searchSubmit, setSearchSubmit] = useState(true)
// 	const methods = useFormContext()
// 	const map = useRef()
// 	const {matchesMobile} = useMedia()
// 	const classes = useStyles()
// 	// const {city} = useCity()
//
// 	// Функция, которая показывает финальный адрес в инпуте
// 	const generateFullAddress = (adrress, submit = false, coordinates) => {
// 		//? Узнать про запрещение изменения адресса
// 		const fullAddress = adrress.getAddressLine().split(',').splice(1,)
//
// 		if (submit) {
// 			if (fullAddress.length == 1) {
// 				setZoom(10)
// 			} else {
// 				setZoom(17)
// 			}
// 		}
// 		// setValue(fullAddress.join(',').trim())
// 		//? В будушем заменить на верхний
// 		setValue(adrress.getAddressLine())
// 		if (setData) setData({locality: adrress.getAddressLine(), coordinates})
// 	}
//
//
// 	//
// 	const changeAddress = (coord) => {
// 		// определение адреса по координатам
// 		// setCoordinates(coord)
// 		ymaps.geocode(coord)
// 			.then((r) => {
// 				// объект адреса
// 				const adrress = (r.geoObjects.get(0))
// 				// placeOfferMapData(adrress.getAddressLine(), coord)
// 				generateFullAddress(adrress, false, coord)
// 			})
// 	}
//
// 	const hintsInput = (submit) => {
// 		// если должны появиться посказки в input, то мы их убираем
// 		if (suggest) suggest.destroy()
//
// 		// Следим за inputom
// 		const searchControl = new ymaps.control.SearchControl({
// 			options: {
// 				provider: 'yandex#map',
// 				size: 'small'
// 			}
// 		})
//
// 		// Добовляем посказки в input
// 		const inputCompele = new ymaps.SuggestView('suggest', {
// 			boundedBy: map.current.getBounds(),
// 			results: 3,
// 		});
//
// 		setSuggest(inputCompele)
//
// 		// событие onSubmit
// 		if (submit) {
// 			searchControl
// 				.search(value)
// 				.then((data) => {
// 					const coord = data.geoObjects.get(0).geometry.getCoordinates()
// 					setSearchSubmit(true)
// 					generateFullAddress(data.geoObjects.get(0), true, coord)
//          			setCoordinates(coord);
// 					inputCompele.destroy();
// 					setSuggestView(false)
// 				})
// 				.catch((e) => console.log(e));
// 		} else {
// 			inputCompele.events.add('select', (e) => {
// 				searchControl
// 					.search(e.get('item').value)
// 					.then((data) => {
// 						const coord = data.geoObjects.get(0).geometry.getCoordinates()
// 						setSearchSubmit(true)
// 						generateFullAddress(data.geoObjects.get(0), true, coord)
// 						setCoordinates(coord);
// 						inputCompele.destroy();
// 						setSuggestView(false)
// 					})
// 					.catch((e) => console.log(e));
// 			})
// 		}
// 	}
//
//
// 	//? Функция следящая за инпутом
// 	const ymapsLoad = () => {
// 		hintsInput()
// 		changeAddress(coordinates)
//
// 		const Balloon = map.current.balloon;
//
// 		Balloon.events.add("open", () => {
// 			setMapMove(false);
// 			// Balloon.autoPan()
// 			Balloon.close(true);
// 		});
//
//
// 		ymaps.geolocation.get({ provider: "yandex", mapStateAutoApply: true, timeout: 0 })
// 			.then(res =>
// 				ymaps.geocode(res.geoObjects.position).then(r => {
// 					const adress = (r.geoObjects.get(0))
// 					generateFullAddress(adress, false, res.geoObjects.position)
// 					setCoordinates(res.geoObjects.position)
// 				})
// 			)
// 			.catch((e) => {
// 				// ymaps.geocode(city).then(r => {
// 				// 	const adress = (r.geoObjects.get(0))
// 				// 	const number = generateStr(adress.getPremiseNumber())
// 				// 	const thoroughfare =  generateStr(adress.getThoroughfare())
// 				// 	const getLocalities1 = generateStr(adress.getLocalities()[1])
// 				// 	const getLocalities = generateStr(adress.getLocalities()[0], true)
//
// 				// 	const newAddress = `${getLocalities}${getLocalities1}${thoroughfare}${number}`
//
// 				// 	setValue(newAddress)
// 				// })
// 				console.log(e)
// 			})
// 	}
//
// 	const handlerClick = (event) => {
// 		setMapMove(true)
// 		map.current.panTo(event.get('coords'), {
// 			delay: 10,
// 			duration: 200
// 		})
// 		  .then(() => {
// 			  setMapMove(false)
// 			  changeAddress(event.get('coords'))
// 			//   console.log(event.get('coords'))
// 			})
// 	}
//
// 	const hanlderBounds = (event) => {
// 		map.current.panTo(event.get('newCenter'), {
// 			delay: 10,
// 			duration: 200
// 		})
// 		  .then(() => setMapMove(false))
// 		if (!searchSubmit) changeAddress(event.get('newCenter'))
// 	}
//
// 	const handlerChange = (event) => {
// 		setValue(event.target.value)
// 		setSuggestView(true)
// 	}
//
// 	const handlerSubmit = (e) => {
// 		e.preventDefault()
// 		hintsInput(true)
// 	}
//
// 	const handlerMouseDown = () => {
// 		setMapMove(true)
// 		setSearchSubmit(false)
// 	}
//
// 	useEffect(() => {
// 		if (suggestView) {
// 			hintsInput()
// 		}
// 	}, [suggestView])
//
//
// 	return (
// 		<div style={{maxWidth: '490px', width: '100%'}}>
// 			<form onKeyDown={(e) => {
// 				if (e.key == 'Enter') {
// 					handlerSubmit(e)
// 				}
// 			}} onSubmit={handlerSubmit}>
// 				<Controller
// 				name='location'
// 				control={methods.control}
// 				defaultValue='test'
// 				render={({ field: {onChange}, fieldState: { error }}) => (
// 					<TextField
// 					value={value}
// 					onChange={(e) => {
// 						handlerChange(e)
// 						onChange(e)
// 					}}
// 					onBlur={(e) => {
// 						setData(prevState => ({
// 							...prevState, locality: e.target.value
// 						}))
// 					}}
// 					className={classes.inputMap}
// 					placeholder='Введите город, улицу, дом'
// 					id="suggest"
// 					error={!!error && value.length < 1}
// 					helperText={error && value.length < 1  ? error.message : ''}
// 					variant="outlined" />
// 				)}
// 				rules={{
// 					required: 'Укажите ваше местоположение...',
// 				   	pattern: {value: invalidСharacterLocation() , message: 'Недопустимые символы' },
// 				}}
// 				/>
// 			</form>
// 			<div style={{position: 'relative'}}>
// 				<Map
// 				instanceRef={map}
// 				state={{ center: coordinates, zoom}}
// 				onMouseDown={handlerMouseDown}
// 				onLoad={ymapsLoad}
// 				onClick={handlerClick}
// 				onBoundsChange={hanlderBounds}
// 				modules={["SuggestView", "control.SearchControl", "geocode", 'geolocation', 'Balloon']}
// 				height={224}
// 				width={matchesMobile ? '100%' : 490}
// 				>
// 					<div className={classes.placemarkBlock} style={{top: `${mapMove ? '60px' : '70px'}`}}>
// 						<CustomPlacemark />
// 					</div>
// 				</Map>
// 			</div>
// 		</div>
// 	)
//
// })
//
//
// const YandexMap = ({setData}) => {
// 	const MainMap = useMemo(() => {
//     	return withYMaps(Location, true);
//   	}, []);
//
// 	return (
// 		<>
// 			<YMaps query={{apikey: ''}}>
// 				<MainMap setData={setData}/>
// 			</YMaps>
// 		</>
//
// 	)
// }
//
// export default YandexMap;