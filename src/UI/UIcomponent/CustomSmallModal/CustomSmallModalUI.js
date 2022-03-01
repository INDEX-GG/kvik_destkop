import React from "react";
import {Dialog} from "@material-ui/core";
import {useCustomSmallModalUIStyles} from './style';

const CustomSmallModalUI = ({openModal, handleCloseModal, maxWidth, children, customPaper}) => {

    const classes = useCustomSmallModalUIStyles()
    const classesPaper = `${classes.paper} ${customPaper ? customPaper : ''}`

    return (
        <Dialog
            open={openModal}
            onClose={handleCloseModal}
            maxWidth={maxWidth}
            classes={{paper: classesPaper}}
        >
            {children}
        </Dialog>
    )
}

export default React.memo(CustomSmallModalUI);
