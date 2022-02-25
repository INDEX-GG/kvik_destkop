import React from "react";
// import {useProductChangeDialogStyles} from './style';
import CustomSmallModalUI from "../../../../UI/UIcomponent/CustomSmallModal/CustomSmallModalUI";

const ProductAdStatusChangeDialog = ({open, onClose}) => {

    // const classes = useProductChangeDialogStyles()

    return (
        <CustomSmallModalUI openModal={open} handleCloseModal={onClose}>
            component
        </CustomSmallModalUI>
    )
}

export default React.memo(ProductAdStatusChangeDialog);
