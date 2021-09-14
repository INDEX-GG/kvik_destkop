import React, { useState, useRef, memo, useMemo } from 'react';
// import Head from 'next/head'
import { YMaps, Map, withYMaps } from 'react-yandex-maps'
import { TextField } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';


const Location = memo(({ymaps}) => {
	const [coordints, setCoordints] = useState([55.185106, 61.332009])
	const [value, setValue] = useState('');
	const [mapMove, setMapMove] = useState(false)
	const map = useRef()


	const generateStr = (str, first = false) => {
		const symbol = first ? '' : ', '
		const newStr = str ? symbol + str : ''

		return newStr;
	}


	const changeAddress = (coord) => {
		ymaps.geocode(coord)
			.then((r) => {
				const adress = (r.geoObjects.get(0))
				
				const number = generateStr(adress.getPremiseNumber())
				const thoroughfare =  generateStr(adress.getThoroughfare())
				const getLocalities1 = generateStr(adress.getLocalities()[1])
				const getLocalities = generateStr(adress.getLocalities()[0], true)

				const newAddress = `${getLocalities}${getLocalities1}${thoroughfare}${number}`

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

		const searchControl = new ymaps.control.SearchControl({
			options: {
				provider: 'yandex#map',
				noSuggestPanel: false
			}
		})

		console.log(searchControl.options)

		const inputCompele = new ymaps.SuggestView('suggest', {
			results: 3,
		});

		if (submit) {
			searchControl
				.search(value)
				.then((data) => {
					 setValue(value)
         			 setCoordints(data.geoObjects.get(0).geometry.getCoordinates());
				})
				.catch((e) => console.log(e));
			return;
		}

		inputCompele.events.add('select', (e) => {
			searchControl
				.search(e.get('item').value)
				.then((data) => {
					 setValue(e.get('item').value)
         			 setCoordints(data.geoObjects.get(0).geometry.getCoordinates());
				})
				.catch((e) => console.log(e));
		})
	}


	//? Функция следящая за инпутом
	const ymapsLoad = () => {
		hintsInput()
		changeAddress(coordints)
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
	}

	const handlerSubmit = (e) => {
		e.preventDefault()
		hintsInput(true)
	}


	return (
		<>
			<form onSubmit={handlerSubmit}>
				<TextField value={value} onChange={handlerChange} style={{width: '600px', margin: "20px 0"}} id="suggest" label="Адрес" variant="outlined" />
			</form>
			<div style={{position: 'relative', width: '600px'}}>
				<Map
				instanceRef={map}
				state={{ 
					center: coordints, 
					zoom: 17,
				}}
				onMouseDown={() => setMapMove(true)}
				onLoad={ymapsLoad}
				onClick={handlerClick}
				onBoundsChange={hanlderBounds}
				modules={["SuggestView", "control.SearchControl", "geocode"]}
				height={224}
				width={600}
				>
					{/* <Placemark geometry={coordints} /> */}
					<RoomIcon color='primary' fontSize='large' style={{position: 'absolute', zIndex: '1', left: '50%', transform: 'translateX(-50%)', top: `${mapMove ? '70px' : '80px'}`, transition: '.2s all linear'}}/>
				</Map>
			</div>
		</>
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