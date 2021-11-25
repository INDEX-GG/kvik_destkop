import {createContext, useContext, useReducer, useEffect, useState} from "react";
import useSWR from 'swr';
import {getDataByGet} from "../fetch";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const LOGIN = 'login',
	  LOGOUT = 'logout';

const AuthProvider = ({children}) => {
	const { data: user } = useSWR('/api/user');
	const [token, setToken] = useState();

	const changeToken = () => {
		getDataByGet('/api/refresh').then(r => {
			if (r?.authToken) {


				setToken(r.authToken)
			}
		})
	}

	useEffect(() => {
		if (user?.message !== 'empty') {
			signIn();
			changeToken()
		} else {
			signOut();
		}
	}, [user])

	useEffect(() => {
		setInterval(() => {
			changeToken()
		}, 100000)
	}, [])

	const AuthReducer = (state, action) => {
		switch (action.type) {
			case LOGIN:
				return {isAuth: true, id: user?.id }
			case LOGOUT: 
				return {isAuth: false}
			default: 
				return state;
		}
	}

	const [state, dispatch] = useReducer(AuthReducer, {isAuth: false})
	const signIn = () => dispatch({type: LOGIN});
	const signOut = () => dispatch({type: LOGOUT});
	
	return (
		<AuthContext.Provider value={{...state, signIn, signOut, token}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;