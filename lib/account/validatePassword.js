import { checkLatin, checkNumber } from "#lib/regulars"

/**
 * @param {string} oldPassword 
 * @param {string} newPassword 
 * @returns {[boolean, import("#components/account/Settings/tabs/PersonalData/Forms").PasswordValidationResults}
 */
export const validatePassword = (oldPassword, newPassword) => {
	const formattedPassword = newPassword.trim();
	const validationResults = {};
	
	// if (oldPassword.trim() === formattedPassword) {
	// 	errors.push(new Error("Новый пароль должен отличаться от старого"))
	// }

	// ! Проверка на длинну
	validationResults.length = formattedPassword.length >= 8 ? true : false

	// ! Проверка на Латиницу
	validationResults.letter = formattedPassword.match(checkLatin()) || formattedPassword.match(checkLatin()) != null
		? true
		: false
	
	// ! Провека на цифру
	validationResults.number = formattedPassword.match(checkNumber()) ? true : false

	//! Проверка на регистр
	// if (!(formattedPassword.match(checkRegister()) && formattedPassword.match(checkRegister()) != null)) {
	// 	errors.push(new Error("Пароль должен включать заглавные буквы."))
	// }

	//! Проверка на кириллицу
	// if (!formattedPassword.match(checkCyrillic())) {
	// 	errors.push(new Error("Пароль должен включать кириллические символы."))
	// }

	//! Конец валидации
	// if (!formattedPassword.match(endOfValidation())) {
	// 	errors.push(new Error("Неизвестная ошибка."))
	// }

	return [true, validationResults]
}