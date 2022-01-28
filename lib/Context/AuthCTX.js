import {createContext, useContext, useReducer, useEffect, useState} from "react";
import useSWR from 'swr';
import {getDataByGet} from "../fetch";

export const AuthContext = createContext();

/**
 * @typedef AuthInfo
 * @property {string} id
 * @property {string} token
 */

/**
 * @returns {AuthInfo}
 */
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
			// action.id накостылен для первого логина. 
			// Потому что после логинизации user.id равен undefined (хук useSWR не делает новый запрос при вызовете редюсера)
			case LOGIN:
				return {isAuth: true, id: user?.id || action.id }
			case LOGOUT: 
				setToken(null)
				return {isAuth: false}
			default: 
				return state;
		}
	}

	const [state, dispatch] = useReducer(AuthReducer, {isAuth: false})

	const signIn = (id) => dispatch({type: LOGIN, id:id});
	const signOut = () => dispatch({type: LOGOUT});
	
	return (
		<AuthContext.Provider value={{...state, signIn, signOut, token}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;