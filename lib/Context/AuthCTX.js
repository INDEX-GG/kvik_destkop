import { createContext, useContext, useReducer, useEffect } from "react";
import useSWR from 'swr';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const LOGIN = 'login',
	  LOGOUT = 'logout';

const AuthProvider = ({children}) => {
	const { data: user } = useSWR('/api/user');

	useEffect(() => {
		if (user?.message !== 'empty') {
			signIn();
		} else {
			signOut();
		}
	}, [user])

	const AuthReducer = (state, action) => {
		switch (action.type) {
			case LOGIN:
				return {isAuth: true, id: user?.id, }
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
		<AuthContext.Provider value={{...state, signIn, signOut}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;