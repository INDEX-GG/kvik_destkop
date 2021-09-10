import React, { useState } from 'react';
// import Head from 'next/head'
import { YMaps, Map, SearchControl } from 'react-yandex-maps'


const YandexMap = () => {

	
	const [postition, setPosition] = useState([55.185106, 61.332009])
	const [search, setSearchControl] = useState(null)

	const handlerClick = (e) => {
		console.log(e)
	}

	console.log(search)

	const onResultShow = (e) => {
		console.log(setPosition)
    	console.log(e)
 	 };

	return (
		<>
			  <YMaps query={{apikey: '57d4ea45-8f8c-4594-9c9b-03dbfcfab0e8', ns: 'use-load-option', load: 'Map,control.ZoomControl'}}>
				  <div>
				  	<Map onClick={handlerClick} height={224} width={490} defaultState={{ center: postition, zoom: 9, controls: ['zoomControl'], }} >
						{/* <Placemark defaultGeometry={[55.185106, 61.332009]} /> */}
						{/* <SearchControl instanceRef={ref } onLoad={(e) => console.log(e)} options={{float: 'left'}}/> */}
						<SearchControl
							instanceRef={ref => setSearchControl(ref)}
							onClear={() => console.log("clear")}
							onResultShow={onResultShow}
						/>
					</Map>
				  </div>
			  </YMaps>
		</>
		
	)
}

export default YandexMap;