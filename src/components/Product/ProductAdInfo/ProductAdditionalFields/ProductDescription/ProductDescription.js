import React, {useRef} from "react";
import {Box} from "@material-ui/core";
import {useProductDescriptionStyles} from './style';
import {formatDescription} from "../../../../../services/services";
import ProductShowMoreWrapper from '../../../ProductWrappers/ProductShowMoreWrapper/ProductShowMoreWrapper'
// TODO: переименовать и перенести в глбальные хуки
import {useGetHeightRef} from '../../../ProductWrappers/ProductShowMoreWrapper/useHeightShowMoreWrapper'

const ProductDescription = ({description, isMobile}) => {

    const classes = useProductDescriptionStyles()

    const descriptionRef = useRef()
    const {childrenHeight} = useGetHeightRef(descriptionRef)

    return (
        <ProductShowMoreWrapper
            align={'center'}
            isMobile={(childrenHeight <= 60) ? false : isMobile}
            // isMobile={isMobile}
            showArrow={false}
            collapsedSize={'54px'}
            textExpand={'Показать полностью'}
            textCollaps={'Скрыть'}
            navMovesWithContent={true}
        >
            <Box 
                ref={descriptionRef}
                component='pre'
                className={classes.description}
            >
                {formatDescription(description)}
            </Box>
        </ProductShowMoreWrapper>
    )
}

export default React.memo(ProductDescription);
