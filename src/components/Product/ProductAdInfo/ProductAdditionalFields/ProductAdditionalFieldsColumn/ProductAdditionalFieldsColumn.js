import React from "react";
import {Box} from "@material-ui/core";
import {useProductAdditionalFieldsColumnStyles} from './style';

const ProductAdditionalFieldsColumn = ({columnData}) => {

    const classes = useProductAdditionalFieldsColumnStyles()
    console.log(columnData);

    return (
        Array.isArray(columnData) ? (
            <Box className={classes.additionalFieldList}>
                {columnData.map(item => (
                    <Box className={classes.additionalFieldItem} key={item.title}>
                        <Box className={classes.additionalFieldTitle}>
                            {item.title}:
                        </Box>
                        <Box className={classes.additionalFieldValue}>
                            {item.value}
                        </Box>
                    </Box>
                ))}
            </Box>
        ) : <></>
    )
}

export default React.memo(ProductAdditionalFieldsColumn);
