import CryptoJS from "crypto-js";

export const useCryptoData = () => {

    const decrypt = (cryptData) => {
        const SECRET_KEY = process.env.NEXT_PUBLIC_MY_SECRET
        const decodeToArray = CryptoJS.AES.decrypt(cryptData, SECRET_KEY)
        return decodeToArray.toString(CryptoJS.enc.Utf8)
    }

    return {
        decrypt,
    }
}
