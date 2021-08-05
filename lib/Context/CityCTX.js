import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

export const CityContext = createContext();

export const useCity = () => useContext(CityContext)

const CityProvider = ({children}) => {

    const [city, setCity] = useState("Москва")

    const changeCity = (arg) => setCity(arg)

    return (
        <CityContext.Provider value={{city, changeCity}}>
            {children}
        </CityContext.Provider>
    )
}

export default CityProvider