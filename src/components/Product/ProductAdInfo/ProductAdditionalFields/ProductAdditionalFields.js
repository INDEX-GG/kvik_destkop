import React, {useMemo} from "react";
import {Box} from "@material-ui/core";
import {useProductAdditionalFields} from "./useProductAdditionalFields";
import ProductAdditionalFieldsArr from "./ProductAdditionalFieldsCheckList/ProductAdditionalFieldsCheckList";
import ProductAdditionalFieldsColumn from "./ProductAdditionalFieldsColumn/ProductAdditionalFieldsColumn";
import ProductDescription from "./ProductDescription/ProductDescription";
import {checkValidArray} from "../../../../services/services";
import {useProductAddFieldsStyles} from './style'

const ProductAdditionalFields = () => {

    const classes = useProductAddFieldsStyles()
    const {russAdditionalFields, description} = useProductAdditionalFields()
    const noArrayValue = useMemo(() => russAdditionalFields?.noArrayValue, [russAdditionalFields?.noArrayValue])
    const onlyArray = useMemo(() => russAdditionalFields?.onlyArrValue, [russAdditionalFields?.onlyArrValue])
    const isLoading = russAdditionalFields && description

    return (
        isLoading ? (
            <Box className={classes.addFields}>
                {checkValidArray(noArrayValue) && (
                    <Box className={classes.addFieldsColumn}>
                        <ProductAdditionalFieldsColumn
                            columnData={noArrayValue}
                        />
                    </Box>
                )}
                {description && (
                    <Box className={classes.addFieldsDescription}>
                        <ProductDescription
                            description={description}
                        />
                    </Box>
                )}
                {checkValidArray(onlyArray) && (
                    <Box className={classes.addFieldsArr}>
                        <ProductAdditionalFieldsArr
                            columnData={onlyArray}
                        />
                    </Box>
                )}
            </Box>
        ) : <></>
    )
}

export default React.memo(ProductAdditionalFields);
