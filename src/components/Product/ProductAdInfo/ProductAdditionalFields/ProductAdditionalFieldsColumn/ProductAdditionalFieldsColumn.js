import React from "react";
import {Box} from "@material-ui/core";
import {useProductAdditionalFieldsColumnStyles} from './style';

const ProductAdditionalFieldsColumn = ({columnData}) => {

    const classes = useProductAdditionalFieldsColumnStyles()
    const itemClass = columnData.length === 1 ?
        [classes.additionalFieldItem, classes.additionalFieldItemSolo] :
        classes.additionalFieldItem

    const checkBooleanValue = (value) => {
        if (typeof  value === 'boolean') {
            if (value) return 'да'
            return 'нет'
        }
        return value
    }


    return (
        Array.isArray(columnData) ? (
            <Box className={classes.additionalFieldList}>
                {columnData.map(item => (
                    <Box className={itemClass} key={item.title}>
                        <Box className={classes.additionalFieldTitle}>
                            {item.title}:
                        </Box>
                        <Box className={classes.additionalFieldValue}>
                            {checkBooleanValue(item.value)}
                        </Box>
                    </Box>
                ))}
            </Box>
        ) : <></>
    )
}

export default React.memo(ProductAdditionalFieldsColumn);