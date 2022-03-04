import React from "react";
import {Box} from "@material-ui/core";
import {useProductAdditionalFieldsCheckListStyles} from './style';

const ProductAdditionalFieldsCheckList = ({columnData}) => {


    const classes = useProductAdditionalFieldsCheckListStyles()

    return (
        columnData ? (
            <>
                {columnData.map(additionalFieldItem => (
                    <Box
                        key={additionalFieldItem.title}
                        className={classes.item}
                    >
                        <Box className={classes.itemTitle}>
                            {additionalFieldItem.title}:
                        </Box>
                        <Box className={classes.listValue}>
                            {additionalFieldItem.value.map(itemValue => (
                                <Box
                                    className={classes.itemValue}
                                    key={itemValue}
                                >
                                    {itemValue}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
            </>
        ) : <></>
    )
}

export default React.memo(ProductAdditionalFieldsCheckList);
