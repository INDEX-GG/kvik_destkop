import { createContext, useState, useContext } from "react";

export const MutableContext = createContext();

export const useMutate = () => useContext(MutableContext);

const MutateProvider = ({children}) => {

	const [mutateAvatar, setMutateAvatar] = useState(true);

	return (
		<MutableContext.Provider value={{mutateAvatar, setMutateAvatar}}>
			{children}
		</MutableContext.Provider>
	)
}

export default MutateProvider;