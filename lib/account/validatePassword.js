import { checkLatin, checkNumber } from "#lib/regulars"

/**
 * @param {string} oldPassword 
 * @param {string} newPassword 
 * @returns {[boolean, import("#components/account/Settings/tabs/PersonalData/Forms").PasswordValidationResults}
 */
export const validatePassword = (oldPassword, newPassword) => {
	const formattedPassword = newPassword.trim();
	const validationResults = {};

	// ! Проверка на длинну
	validationResults.length = formattedPassword.length >= 8

	// ! Проверка на Латиницу
	validationResults.letter = formattedPassword.match(checkLatin())
	
	// ! Провека на цифру
	validationResults.number = formattedPassword.match(checkNumber())

	// если значение одного из ключей `false`
	if (Object.values(validationResults).some((constraint) => !constraint)) {
		return [false, validationResults];
	}

	return [true, validationResults];
}