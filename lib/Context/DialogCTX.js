import { createContext, useState } from "react"

export const DialogCTX = createContext({})
export const LoginDrawerCTX = createContext({})
export const RegistrationCTX = createContext({})

export const UnpublishCTX = createContext({})
export const DelActiveCTX = createContext({})

const LoginDrawerProvider = ({ children }) => {
	const [modalState, setModalState] = useState({ left: false })
	const [openRegForm, setOpenRegForm] = useState(false)
	const [openLoginForm, setOpenLoginForm] = useState(false)
	const [isAlreadyExistForm, setIsAlreadyExistForm] = useState(false)

	return (
		<LoginDrawerCTX.Provider
			value={{
				modalState,
				setModalState,
				openRegForm,
				setOpenRegForm,
				openLoginForm,
				setOpenLoginForm,
				isAlreadyExistForm,
				setIsAlreadyExistForm,
			}}
		>
			{children}
		</LoginDrawerCTX.Provider>
	)
}

export default LoginDrawerProvider
