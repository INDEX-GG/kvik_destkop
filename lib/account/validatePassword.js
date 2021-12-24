import { checkCyrillic, checkLatin, checkNumber, checkRegister, checkWhitespace, endOfValidation } from "#lib/regulars"

/**
 * @param {string} password 
 * @returns {[boolean, string | Error[]}
 */
export const validatePassword = (password) => {
	const errors = []

	// ! Проверка на длинну
	if (!password.length >= 8) {
		errors.push(new Error("Пароль должен быть не менее 8 символов."))
	}

	// ! Проверка на Латиницу
	if (!(password.match(checkLatin()) || password.match(checkLatin()) != null)) {
		errors.push(new Error("Пароль должен включать латинские символы."))
	}	

	// ! Провека на цифру
	if (!password.match(checkNumber())) {
		errors.push(new Error("Пароль должен включать цифры."))
	}

	//! Проверка на регистр
	if (!(password.match(checkRegister()) && password.match(checkRegister()) != null)) {
		errors.push(new Error("Пароль должен включать заглавные буквы."))
	}

	//! Проверка на пробел
	if (password.match(checkWhitespace())) {
		errors.push(new Error("Пароль должен не включать пробелы."))
	}

	//! Проверка на кириллицу
	if (!password.match(checkCyrillic())) {
		errors.push(new Error("Пароль должен включать кириллические символы."))
	}

	//! Конец валидации
	if (!password.match(endOfValidation())) {
		errors.push(new Error("Неизвестная ошибка."))
	}

	if (errors.length) {
		return [false, errors]
	}

	return [true, password]
}