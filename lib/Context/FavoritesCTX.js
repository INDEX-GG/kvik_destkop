import { createContext, useContext, useReducer, useEffect } from "react";
import useSWR from 'swr';
import { useUser } from "../../hooks/useUser";

export const FavContext = createContext();

export const useFaverits = () => useContext(FavContext);


const FavProvider = ({ children }) => {
    const { favorites, isLoading } = useUser();

    console.log(isLoading, favorites)
    return (
		<FavContext.Provider value={{favorites}}>
			{children}
		</FavContext.Provider>
	)
}

export default FavProvider;