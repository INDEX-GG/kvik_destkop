import React from "react";

import {useProductConnection} from "../useProductConnection";
import {useProductContext} from "../../../../context/ProductContext";
import ProductConnectionButton from "../../../AnyPage/ProductConnectionButtons/ProductConnectionButton";
import ProductAdStatusChangeDialog from "../../../AnyPage/ProductAdStatusChangeDialog/ProductAdStatusChangeDialog";

import {usePlugImages} from '#hooks/usePlugImages'

const ProductMyAdButtons = ({isActive, isNoActive, isBanned, isTimeLimit}) => {

    const {
        deleteModal,
        activeModal,
        removeModal,
        handleChangeAd,
        handleChangeActiveModal,
        handleChangRemoveModal,
        handleChangeDeleteModal,
        successCallback
    } = useProductConnection()

    const {
        productData: {
            id,
            address,
            photo,
            price,
            title,
            status,
            category_id,
        }
    } = useProductContext()

    const {arr} = usePlugImages(photo, category_id)


    return (
        <>
            {/*Активное */}
            {isActive && (
                <>
                    <ProductConnectionButton
                        onClick={handleChangeAd(id)}
                        title='Редактировать'
                        isMyAd={true}
                    />
                    <ProductConnectionButton
                        onClick={handleChangRemoveModal}
                        title='Снять с публикации'
                        isMyAd={true}
                    />
                    <ProductAdStatusChangeDialog
                        open={removeModal}
                        onClose={handleChangRemoveModal}
                        adAddress={address}
                        // adPhoto={photo[0]}
                        adPhoto={arr[0]}
                        adPrice={price}
                        adTitle={title}
                        adId={id}
                        statusData={status}
                        callbackSuccess={successCallback}
                    />
                </>
            )}
            {/* Архив */}
            {isNoActive && (
                <>
                    <ProductConnectionButton
                        onClick={handleChangeActiveModal}
                        title='Активировать'
                        isMyAd={true}
                    />
                    <ProductConnectionButton
                        onClick={handleChangeAd(id)}
                        title='Редактировать'
                        isMyAd={true}
                    />
                    <ProductConnectionButton
                        onClick={handleChangeDeleteModal}
                        title='Удалить'
                        isMyAd={true}
                    />
                    <ProductAdStatusChangeDialog
                        open={activeModal}
                        onClose={handleChangeActiveModal}
                        adAddress={address}
                        adPhoto={photo[0]}
                        adPrice={price}
                        adTitle={title}
                        adId={id}
                        statusData={status}
                        callbackSuccess={successCallback}
                    />
                    <ProductAdStatusChangeDialog
                        open={deleteModal}
                        onClose={handleChangeDeleteModal}
                        adAddress={address}
                        adPhoto={photo[0]}
                        adPrice={price}
                        adTitle={title}
                        adId={id}
                        statusData={'delete'}
                        callbackSuccess={successCallback}
                    />
                </>
            )}
            {/* Заблокированное */}
            {isBanned && (
                <>
                    <ProductConnectionButton
                        onClick={handleChangeAd(id)}
                        title='Редактировать'
                        isMyAd={true}
                    />
                    <ProductConnectionButton
                        onClick={handleChangeDeleteModal}
                        title='Удалить'
                        isMyAd={true}
                    />
                </>
            )}
            {/* истек срок размещения */}
            {isTimeLimit && (
                <>
                    <ProductConnectionButton
                        onClick={handleChangeActiveModal}
                        title='Активировать'
                        isMyAd={true}
                    />
                    <ProductConnectionButton
                        onClick={handleChangeAd(id)}
                        title='Редактировать'
                        isMyAd={true}
                    />
                    <ProductConnectionButton
                        onClick={handleChangeDeleteModal}
                        title='Удалить'
                        isMyAd={true}
                    />
                </>
            )}
        </>
    )
}

export default React.memo(ProductMyAdButtons);
