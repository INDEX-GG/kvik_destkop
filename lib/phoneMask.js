export default function PhoneMask(e, value, setValue) {

    let inputOnlyNumber = e.target.value.replace(/\D/g, "");

    let formattedInputValue = "";
    
    if (!inputOnlyNumber) {
        setValue("");
        return;
    }

    if (inputOnlyNumber[0] === "9") inputOnlyNumber = "7" + inputOnlyNumber;
    formattedInputValue = "+7 ";
    if (inputOnlyNumber.length > 1) {
        formattedInputValue += "(" + inputOnlyNumber.substring(1, 4);
    }
    if (inputOnlyNumber.length >= 5) {
        formattedInputValue += ") " + inputOnlyNumber.substring(4, 7);
    }
    if (inputOnlyNumber.length >= 8) {
        formattedInputValue += "-" + inputOnlyNumber.substring(7, 9);
    }
    if (inputOnlyNumber.length >= 10) {
        formattedInputValue += "-" + inputOnlyNumber.substring(9, 11);
    }

    if (e.target.value.length >= 0 && e.target.value.length <= 18) {
        setValue(formattedInputValue);
    }

    return inputOnlyNumber
}

/**
 * @param {number | string } number 
 */
export const formatPhoneNumber = (number) => {
	let numberString = String(number).replace(/\D/g, "");
	let formattedValue = "";

	if (numberString[0] === "9") numberString = "7" + numberString;
	formattedValue = "+7 ";

	if (numberString.length > 1) {
		formattedValue += "(" + numberString.substring(1, 4);
	}
	if (numberString.length >= 5) {
		formattedValue += ") " + numberString.substring(4, 7);
	}
	if (numberString.length >= 8) {
		formattedValue += "-" + numberString.substring(7, 9);
	}
	if (numberString.length >= 10) {
		formattedValue += "-" + numberString.substring(9, 11);
	}

	return formattedValue;
}