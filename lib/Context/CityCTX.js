import {createContext, useContext, useEffect, useState} from "react";
// import axios from "axios";

export const CityContext = createContext();
export const useCity = () => useContext(CityContext)

const CityProvider = ({children}) => {
    const [city, setCity] = useState("Москва")
    // const [cityGeocoder, setCityGeocoder] = useState('')

    const changeCity = (arg) => setCity(arg)


	


    useEffect(() => {
        //? Добавить проверку на авторизацию
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((e) => {
        //         const yandexApiKey = '57d4ea45-8f8c-4594-9c9b-03dbfcfab0e8'
        //         const latitude = e.coords.latitude
        //         const longitude = e.coords.longitude
        //         const testUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&kind=locality&results=1&apikey=${yandexApiKey}&geocode=${longitude},${latitude}`
        //         if (!cityGeocoder) {
        //             axios.get(testUrl).then(r => {
        //                 if (!cityGeocoder) setCityGeocoder(r.data)
        //             })
        //         }
        //     });
        // } else {
        //     console.log('Нету разрешения')
        // }
    })

    // useEffect(() => {
    //     if (cityGeocoder) {
    //         const {response: {GeoObjectCollection: {featureMember}}} = cityGeocoder
    //         const fullAdrress = featureMember[0].GeoObject.description.split(',')
    //         // const city = fullAdrress.split(',')[0]
    //         console.log(fullAdrress)
    //         //? РАСКОМЕНТИРОВАТЬ КОГДА КУПИМ ПЛАТНУЮ ВЕРСИЮ API
    //         // setCity(city)
    //     }
    // } , [cityGeocoder])


    return (
        <CityContext.Provider value={{city, changeCity}}>
            {children}
        </CityContext.Provider>
    )
}

export default CityProvider