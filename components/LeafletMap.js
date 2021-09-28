import { MapContainer, TileLayer } from 'react-leaflet'
import { useCallback, useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import CustomPlacemark from '../UI/icons/Placemark'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import 'leaflet.locatecontrol' //! Удалить
import 'leaflet/dist/leaflet.css'

// const zoom = 13

function DisplayPosition({ map, setValue }) {
  const [/** position */, setPosition] = useState(map.getCenter())

  const geocoder = L.Control.Geocoder.nominatim(); 

//   const onClick = useCallback(() => {
//     map.setView(center, zoom)
//   }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
	// setValue('')
  }, [map])

  useEffect(() => {
    map.on('move', onMove)

	// map.on('mouseup', e => {
	// 	geocoder.reverse(
	// 		e.latlng,
	// 		map.options.crs.scale(map.getZoom()),
	// 		results => {
	// 			const r = results[0]
	// 			const address = r.properties.address
	// 			const city = address?.city ? address.city : ''
	// 			const street =  address?.road ? ', ' +address.road : ''
	// 			const houseNumber = address?.house_number ? ', ' + address.house_number : ''
	// 			const fullAddress = city + street + houseNumber
	// 			setValue(fullAddress)
	// 			console.log(1)
    //     	}
    // 	)
	// })

	map.on('click', e => {
		console.log(e)
		geocoder.reverse(
			e.latlng,
			map.options.crs.scale(map.getZoom()),
			results => {
				const r = results[0]
				console.log(r.properties.address)
				const address = r.properties.address
				const city = address?.city ? address.city : ''
				const street =  address?.road ? ', ' + address.road : ''
				// const cityDistrict = address?.city_district ? ', ' + address.city_district : ' ' 
				const houseNumber = address?.house_number ? ', ' + address.house_number : ''
				const fullAddress = city + street + houseNumber
				map.setView(new L.LatLng(e.latlng.lat, e.latlng.lng));
				setValue(fullAddress)
        	}
    	);
	})

    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return null
}


const Map = () => {
	const [map, setMap] = useState(null)
	const [value, setValue] = useState('')
	const [center, /** setCenter */] = useState([55.2549475, 61.3907561])

	const provider = new OpenStreetMapProvider()

	const handleChange = async (e) => {
		setValue(e.target.value)
		try {
			// setTimeout(async () => {
			// 	const results = await provider.search({ query: 'Россия,' + value })
			// 	// SuggestGenerate(results)
			// 	console.log(results[0])
			// }, 1000)
		} catch (e) {
			console.log(e)
		}
		// console.log(suggest)
	}

	// function SuggestGenerate(suggest) {
	// 	console.log(suggest)
	// 	return 1
	// }

	// useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((e) => {
    //             const latitude = e.coords.latitude
    //             const longitude = e.coords.longitude
    //             console.log(latitude, longitude)
	// 			// const geocoder = L.Control.Geocoder.nominatim(); 
    //         });
    //     } else {
    //         console.log('Нету разрешения')
    //     }
	// })


	const searchControl = new GeoSearchControl({
		style: 'bar',
		animateZoom: true,
		searchLabel: 'search',
		autoComplete: true,
		autoClose: true,
		keepResult: true,
		provider: provider,
		showMarker: false
	});

	useEffect(() => {
		if (map) { 
			map.addControl(searchControl)
			// console.log(L.control.locate().addTo(map))
		}
	}, [map])


	const handleSubmit = async (e) => {
		e.preventDefault()
		const results = await provider.search({ query: 'Россия,' + value });
		if (results.length != 0) {
			// setValue(results[0].label)
			map.setView(new L.LatLng(results[0].y, results[0].x));
		}
	}


	const displayMap = useMemo(() => (
		<div style={{position: 'relative'}}>
			<MapContainer center={center} zoom={17} whenCreated={setMap} style={{height: 400, width: "100%"}}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
			<div style={{zIndex: 1000, position: 'absolute', top: '45%', left: '50%', transform: 'translate(-45%, -50%)'}}>
					<CustomPlacemark/>
			</div>
		</div>
	), [])

	return (
		<>	
			<form onSubmit={handleSubmit}>
				<input style={{width: '700px'}} value={value} onChange={handleChange} />
			</form>
			{map ? <DisplayPosition map={map} setValue={setValue} /> : null}
			{displayMap}
		</>
	)

}

export default Map
