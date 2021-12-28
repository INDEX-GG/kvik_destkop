import { checkCyrillic, checkLatin, checkNumber, checkRegister, endOfValidation } from "#lib/regulars"

/**
 * @param {string} oldPassword 
 * @param {string} newPassword 
 * @returns {[boolean, string | Error[]}
 */
export const validatePassword = (oldPassword, newPassword) => {
	const formattedPassword = newPassword.trim();
	const errors = []
	
	if (oldPassword.trim() === formattedPassword) {
		errors.push(new Error("Новый пароль должен отличаться от старого"))
	}

	// ! Проверка на длинну
	if (!formattedPassword.length >= 8) {
		errors.push(new Error("Пароль должен быть не менее 8 символов."))
	}

	// ! Проверка на Латиницу
	if (!(formattedPassword.match(checkLatin()) || formattedPassword.match(checkLatin()) != null)) {
		errors.push(new Error("Пароль должен включать латинские символы."))
	}	

	// ! Провека на цифру
	if (!formattedPassword.match(checkNumber())) {
		errors.push(new Error("Пароль должен включать цифры."))
	}

	//! Проверка на регистр
	if (!(formattedPassword.match(checkRegister()) && formattedPassword.match(checkRegister()) != null)) {
		errors.push(new Error("Пароль должен включать заглавные буквы."))
	}

	//! Проверка на кириллицу
	if (!formattedPassword.match(checkCyrillic())) {
		errors.push(new Error("Пароль должен включать кириллические символы."))
	}

	//! Конец валидации
	if (!formattedPassword.match(endOfValidation())) {
		errors.push(new Error("Неизвестная ошибка."))
	}

	if (errors.length) {
		return [false, errors]
	}

	return [true, formattedPassword]
}