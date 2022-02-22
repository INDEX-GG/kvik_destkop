import axios from "axios";
import {getDataByGet} from "#lib/fetch";

const actualToken = async (token) => {
    const actualToken = token ? token : await getDataByGet('/api/refresh')
    return {
        headers: {
            "x-access-token": actualToken
        }
    }
}

export const fetchPromotionAd = async (data, token) => {
    const tokenHeader = await actualToken(token)
    const res = await axios.post('/api/pay/promotion', data, tokenHeader)
        .then(r => r.data)
        .catch(() => fetchPromotionAd(data, undefined));
    return res;
}
