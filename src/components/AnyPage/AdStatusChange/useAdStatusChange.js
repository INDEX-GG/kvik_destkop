import {useEffect, useMemo, useState} from "react";
import {verifyActive} from "../../../fetch/fetch";
import {useAuth} from "#lib/Context/AuthCTX";

export const useAdStatusChange = (statusData, onClose) => {

    const {token, id} = useAuth();
    const [viewContent, setViewContent] = useState({title: '', subtitle: '', buttons: []})
    const isButtons = useMemo(() => !!viewContent.buttons.length, [viewContent])


    const adChangeStatus = (active, productID, callbackSuccess, status) => {
        return () => {
            const sendData = {
                active: active,
                id: [productID],
                user_id: id
            }

            console.log(sendData);
            verifyActive(sendData, token)
                .then((r) => {
                    if (r.message === 'successfully update') {
                        callbackSuccess(status)
                        onClose()
                    }
                })
        }
    }


    useEffect(() => {
        switch (statusData) {
            case "ok":
                setViewContent({
                    title: 'Снять с публикации',
                    subtitle: 'Выберите причину',
                    buttons: [
                        {title: 'Продано на Kvik', onClick: adChangeStatus, active: "1"},
                        {title: 'Продано в другом месте', onClick: adChangeStatus, active: "2"},
                        {title: 'Другая причина', onClick: adChangeStatus, active: "3"},
                    ],
                    successStatus: 'no_active'
                })
                break;
            case "delete":
                setViewContent({
                    title: 'Удалить из своих объявлений',
                    subtitle: 'Вы действительно хотите удалить объявление ?',
                    buttons: [
                        {title: 'Да удалить', onClick: adChangeStatus, active: "99"},
                        {title: 'Нет', onClick: () => () => onClose(), active: 'none'}
                    ],
                    successStatus: 'delete'
                })
                break;
            case "no_active":
                setViewContent({
                    title: 'Заново активировать',
                    subtitle: 'Вы хотите активировать объявление?',
                    buttons: [
                        {title: 'Да', onClick: adChangeStatus, active: "0"},
                        {title: 'Нет', onClick: () => () => onClose(), active: 'none'},
                    ],
                    successStatus: 'ok'
                })
                break;
            case "time_limit" :
                break;
        }

    }, [statusData])

    return {
        viewContent,
        isButtons
    }
}
