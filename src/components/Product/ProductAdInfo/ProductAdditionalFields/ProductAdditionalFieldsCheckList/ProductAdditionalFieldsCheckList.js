import React, {useRef} from "react";
import {Box} from "@material-ui/core";

import {useProductAdditionalFieldsCheckListStyles} from './style';
import {useGetHeightRef} from '../../../ProductWrappers/ProductShowMoreWrapper/useHeightShowMoreWrapper'
import ProductShowMoreWrapper from '../../../ProductWrappers/ProductShowMoreWrapper/ProductShowMoreWrapper'

const ProductAdditionalFieldsCheckList = ({columnData, isMobile}) => {

    const classes = useProductAdditionalFieldsCheckListStyles()

    const aditionalFieldsCheckRef = useRef()
    const {childrenHeight} = useGetHeightRef(aditionalFieldsCheckRef)

    return (
        columnData ? (
            <ProductShowMoreWrapper
                isMobile={(childrenHeight <= 70) ? false : isMobile}
            >
                {columnData.map(additionalFieldItem => (
                    <Box
                        key={additionalFieldItem.title}
                        className={classes.item}
                        ref={aditionalFieldsCheckRef}

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
            </ProductShowMoreWrapper>
        ) : <></>
    )
}

export default React.memo(ProductAdditionalFieldsCheckList);
