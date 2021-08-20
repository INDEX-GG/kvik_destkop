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