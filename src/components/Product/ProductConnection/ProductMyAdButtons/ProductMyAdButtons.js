import React, {useMemo} from "react";
import ProductConnectionButton from "../../../AnyPage/ProductConnectionButtons/ProductConnectionButton";
import {useProductConnection} from "../useProductConnection";
import ProductAdStatusChangeDialog from "../../../AnyPage/ProductAdStatusChangeDialog/ProductAdStatusChangeDialog";
import {useProductContext} from "../../../../context/ProductContext";

const ProductMyAdButtons = () => {

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
        }
    } = useProductContext()

    const isStatusOk = useMemo(() => status === 'ok', [status])
    const isStatusNoActive = useMemo(() => status === 'no_active', [status])
    const isStatusBanned = useMemo(() => status === 'banned', [status])


    return (
        <>
            {/*Активное */}
            {isStatusOk && (
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
                        adPhoto={photo[0]}
                        adPrice={price}
                        adTitle={title}
                        adId={id}
                        statusData={status}
                        callbackSuccess={successCallback}
                    />
                </>
            )}
            {/* Архив */}
            {isStatusNoActive && (
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
            {isStatusBanned && (
                <>block</>
            )}
        </>
    )
}

export default React.memo(ProductMyAdButtons);
