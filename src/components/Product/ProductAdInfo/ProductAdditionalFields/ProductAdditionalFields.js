import React, {useMemo} from "react";
import {Box} from "@material-ui/core";
import {useProductAdditionalFields} from "./useProductAdditionalFields";
import ProductAdditionalFieldsArr from "./ProductAdditionalFieldsCheckList/ProductAdditionalFieldsCheckList";
import ProductAdditionalFieldsColumn from "./ProductAdditionalFieldsColumn/ProductAdditionalFieldsColumn";
import ProductDescription from "./ProductDescription/ProductDescription";
import {checkValidArray} from "../../../../services/services";

const ProductAdditionalFields = () => {

    const {russAdditionalFields, description} = useProductAdditionalFields()
    const noArrayValue = useMemo(() => russAdditionalFields?.noArrayValue, [russAdditionalFields?.noArrayValue])
    const onlyArray = useMemo(() => russAdditionalFields?.onlyArrValue, [russAdditionalFields?.onlyArrValue])
    const isLoading = russAdditionalFields && description

    console.log(isLoading)

    return (
        isLoading ? (
            <Box>
                {checkValidArray(noArrayValue) && (
                    <ProductAdditionalFieldsColumn
                        columnData={noArrayValue}
                    />
                )}
                {description && (
                    <ProductDescription
                        description={description}
                    />
                )}
                {checkValidArray(onlyArray) && (
                    <ProductAdditionalFieldsArr
                        columnData={onlyArray}
                    />
                )}
            </Box>
        ) : <></>
    )
}

export default React.memo(ProductAdditionalFields);
