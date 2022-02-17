import React, {useState, useEffect} from 'react';
import {Dialog} from "@material-ui/core";
import PayPromotionResult from "../PayPromotionResult/PayPromotionResult";
import {useRouter} from "next/router";
import KvikPayIcon from "../../../UI/UIicon/KvikPayIcon";
import KvikPayFalseIcon from "../../../UI/UIicon/KvikPayFalseIcon";

const PayPromotionModal = () => {

    const router = useRouter();
    const [promotionModal, setPromotionModal] = useState(false)
    const isPromotion = router.query?.success === 'true'

    useEffect(() => {
        setPromotionModal(!!router.query?.success)
    }, [router])

    const handleCloseModal = () => {
        setPromotionModal(false);
        router.push('/', {query: {}})
    }

    return (
        <Dialog open={promotionModal} onClose={handleCloseModal}>
            {isPromotion ? (
                <PayPromotionResult
                    icon={KvikPayIcon}
                    title='Услуга успешно оплачена'
                    handleCloseModal={handleCloseModal}/>
            ) : (
                <PayPromotionResult
                    icon={KvikPayFalseIcon}
                    title='Не удалось оплатить, попробуйте позже'
                    handleCloseModal={handleCloseModal}
                />
            )}
        </Dialog>
    );
};

export default PayPromotionModal;
