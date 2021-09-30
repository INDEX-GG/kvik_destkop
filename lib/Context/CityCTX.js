import axios from "axios";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import { useAuth } from "./AuthCTX";
// import axios from "axios";

export const CityContext = createContext();
export const useCity = () => useContext(CityContext)

const CityProvider = ({children}) => {

    const [city, setCity] = useState("Москва")
	const [/** geo */, setGeo] = useState([55.755819, 37.617644])
	const {isAuth} = useAuth()
	const countRender = useRef()

    const changeCity = (arg) => setCity(arg)	


	useEffect(() => {
		countRender.current = 0
	}, [])

	useEffect(() => {
		countRender.current += 1
	}, [isAuth])



	const generateCity = (result) => {
		const autoCity = result.location.value.substring(2,)
		setCity(autoCity)
		const geo = [result.location.data.geo_lat, result.location.data.geo_lon];

		if (isAuth) {
			console.log("API")
		} else {
			localStorage.setItem('cities', JSON.stringify({city: autoCity, geo}) + '')
		}
	}


	useEffect(() => {
		if (isAuth) {
			console.log('GET API')
		} else {
			const cities = localStorage.getItem('cities')
			if (cities) {
				setCity(JSON.parse(cities).city)
				setGeo(JSON.parse(cities).geo)
			}
		}
	}, [isAuth])


    useEffect(async () => {
		if (isAuth) {
			console.log('Авторазован')
		} else {
				if (!localStorage.getItem('cities') && countRender.current >= 2) {
				const resIp = await axios.get('https://api.ipify.org/?format=jsonp&callback=getIP').then(r => r.data)
				const inpStrIndex = [resIp.indexOf('{'), resIp.indexOf('}')]
				const userIp = JSON.parse(resIp.substring(inpStrIndex[0], inpStrIndex[1] + 1))?.ip
				if (userIp) {
					const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
					const token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222";
					const query = userIp
					const options = {
						method: "GET",
						mode: "cors",
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": "Token " + token
						}
					}
					fetch(url + query, options)
					.then(response => response.text())
					.then(result => generateCity(JSON.parse(result), userIp))
					.catch(error => console.log("error", error));
				}
			}
		}
    }, [isAuth])

    return (
        <CityContext.Provider value={{city, changeCity}}>
            {children}
        </CityContext.Provider>
    )
}

export default CityProvider