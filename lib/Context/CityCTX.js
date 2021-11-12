import axios from "axios";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import { useStore } from "../Context/Store";
import { useAuth } from "./AuthCTX";
// import axios from "axios";

export const CityContext = createContext();
export const useCity = () => useContext(CityContext)

const CityProvider = ({children}) => {

    const [city, setCity] = useState("Москва")
	const [geo , setGeo] = useState([55.755819, 37.617644])
	const {isAuth, id} = useAuth()
	const countRender = useRef()
	const {setUserInfo, userInfo} = useStore()
	const [cityUpdate, setCityUpdate] = useState(false)


    const changeCity = (arg) => {
		if (isAuth) {
			setCity(arg)
		} else {
			setCity(arg)
			console.log(arg)
			// localStorage.setItem('cities')
		}
	}

	//? Нужно, чтобы при первом рендере ничего не срабатывало 
	useEffect(() => {
		countRender.current = 0
	}, [])

	useEffect(() => {
		countRender.current += 1
	}, [isAuth])

	

	const generateCity = (result) => {
		const autoCity = result.location.value.substring(2,)
		const geo = [result.location.data.geo_lat, result.location.data.geo_lon];
		if (isAuth) {
			axios.post('/api/userLocation', {user_id: id, data: {name: autoCity, geo: geo}}).then(() => {
				setCityUpdate(true)
				setUserInfo({...userInfo, location: {name: autoCity, geo}})
			})
		} else {
			setCity(autoCity)
			localStorage.setItem('cities', JSON.stringify({city: autoCity, geo}) + '')
		}
	}


	useEffect(() => {
		const cities = localStorage.getItem('cities')
		if (isAuth) {
			if (userInfo?.location) {
				setCity(userInfo.location.name)
				setGeo(userInfo.location.geo)
				if (cities) localStorage.removeItem('cities')
			} 
		} else {
			if (cities) {
				setCity(JSON.parse(cities).city)
				setGeo(JSON.parse(cities).geo)
			}
		}
	}, [isAuth, userInfo, cityUpdate])

	const fetchCity = async () => {
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


    useEffect(async () => {
		if (isAuth) {
			if (userInfo) {
				if (!userInfo.location) {
					fetchCity()
				}
			}
		} else {
			if (!localStorage.getItem('cities') && countRender.current >= 2) {
				fetchCity()
			}
		}
    }, [isAuth, userInfo])

    return (
        <CityContext.Provider value={{city, geo, changeCity}}>
            {children}
        </CityContext.Provider>
    )
}

export default CityProvider