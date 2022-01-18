import {createContext, useContext, useEffect, useRef, useState} from "react";
import { useStore } from "../Context/Store";
import { useAuth } from "./AuthCTX";
import {getTokenDataByPost} from "../fetch";
import {fetchCity, generateCityObj} from "../services";
// import axios from "axios";

export const CityContext = createContext();
export const useCity = () => useContext(CityContext)

const CityProvider = ({children}) => {

    const [city, setCity] = useState("Москва")
	const [geo , setGeo] = useState([55.755819, 37.617644])
	const [searchCity, setSearchCity] = useState('')
	const {isAuth, id, token} = useAuth()
	const countRender = useRef()
	const {setUserInfo, userInfo} = useStore()
	const [cityUpdate, setCityUpdate] = useState(false)

    const changeCity = (arg, searchName) => {
		if (isAuth) {
			setCity(arg)
		} else {
			setCity(arg)
            if (searchName) {
                setSearchCity(searchName)
            }
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


        const cityObj = generateCityObj(result.location);
        const {searchName, name} = cityObj;


		if (isAuth) {
			getTokenDataByPost('/api/userLocation', {user_id: id, data: cityObj}, token).then(() => {
				setCityUpdate(true)
				setUserInfo({...userInfo, location: cityObj})
			})
		} else {
			setCity(name)
			localStorage.setItem('cities', JSON.stringify(cityObj) + '')
            setSearchCity(searchName)
		}
	}


	useEffect(() => {
		const cities = localStorage.getItem('cities')
		if (isAuth) {
			if (userInfo?.location) {
				setCity(userInfo.location.name)
				setGeo(userInfo.location.geo)
				setSearchCity(userInfo.location.searchName)
				if (cities) localStorage.removeItem('cities')
			} 
		} else {
			if (cities) {
				setCity(JSON.parse(cities).name)
				setGeo(JSON.parse(cities).geo)
                setSearchCity(JSON.parse(cities).searchName)
			}
		}
	}, [isAuth, userInfo, cityUpdate])


    useEffect(async () => {
		if (isAuth) {
			if (userInfo) {
				if (!userInfo.location) {
					fetchCity(generateCity)
				}
			}
		} else {
			if (!localStorage.getItem('cities') && countRender.current >= 2) {
                const localStorageObj = await fetchCity(generateCity)

                if (localStorageObj) {
                    setCity(localStorageObj.name)
                    setGeo(localStorageObj.geo)
                    setSearchCity(localStorageObj.searchName)
                }
			}
		}
    }, [isAuth, userInfo])

    // console.log(city)

    return (
        <CityContext.Provider value={{city, geo, changeCity, searchCity}}>
            {children}
        </CityContext.Provider>
    )
}

export default CityProvider