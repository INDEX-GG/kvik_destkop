
export const num = () => {
	return (
		/[^0-9]/g
	)
}

export const vin = () => {
	return (
		/[^a-zA-Z0-9]/g
	)
}

export const invalidСharacterLocation = () => {
	return (
		/^[a-zA-Zа-яА-Я0-9,.\s"'()-]+$/
		
	)
}

export const invalidСharacterProduct = () => {
	return (
		/^[a-zA-Zа-яА-Я0-9\s,."'-]+$/
	)
}

export const invalidCharacterChangePassword = () => {
	return (
		/^[A-Za-z0-9!@#$%^&*]*$/g
	)
}
/^\S*$/g
export const checkLatin = () => {
	return (
		/(?=.*[a-z])/g
	)
}

export const checkRegister = () => {
	return (
		/(?=.*[a-z])/g
	)
}

export const checkNumber = () => {
	return (
		/[\d.,:]/g
	)
}

export const checkWhitespace = () => {
	return (
		/^\S*$/g
	)
}

export const checkCyrillic = () => {
	return (
		/[а-яё]/g
	)
}

export const endOfValidation = () => {
	return (
		/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
	)
}