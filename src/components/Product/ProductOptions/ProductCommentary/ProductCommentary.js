import React from 'react';
import NoteIcon from "../../../../UI/UIicon/NoteIcon";
import {Box, TextField} from "@material-ui/core";
import {useProductCommentaryStyles} from "./style";
import {useProductCommentary} from "./useProductCommentary";

const ProductCommentary = ({isMyAd}) => {

    const classes = useProductCommentaryStyles();
    const {
        valueInput,
        viewInput,
        handClickView,
        handleChangeInput
    } = useProductCommentary();

    const classInputContainer = `${classes.inputContainer} ${!viewInput ? classes.inputContainerHide : ''}`

    return (
        !isMyAd ? (
            <Box className={classes.note}>
                <Box className={classInputContainer}>
                    <TextField
                        value={valueInput}
                        onChange={handleChangeInput}
                        variant='outlined'
                        classes={{root: classes.input}}
                        placeholder='Заметка к объявлению'
                    />
                </Box>
                <Box
                    className={classes.noteIcon}
                    onClick={handClickView}
                >
                    <NoteIcon/>
                </Box>
            </Box>
        ) : <></>
    );
};


export default React.memo(ProductCommentary);
