import React, {useState} from 'react';
import {Collapse, Box} from "@material-ui/core";

import CustomButtonUI from 'src/UI/UIcomponent/CustomButtonUI/CustomButtonUI'
import {useProductShowMoreWrapperStyles} from './style'
import {useProductContext} from '../../../../context/ProductContext'

/**
 * TODO: Переписать проверку на мобилку
 * @param {*} param0
 * @returns
 */
const ProductShowMoreWrapper = ({children}) => {

  const classes = useProductShowMoreWrapperStyles()
  const {isMobile} = useProductContext();

  const [openDesc, setOpenDesc] = useState(false)

  const handlerOpenDesc = () => {
    setOpenDesc(!openDesc)
  }

  return (
    <>
      {isMobile ?
        <Box className={classes.root}>
            <Collapse
              in={openDesc}
              collapsedSize='54px'
              // className={clsx(
              //   classes.showSmall, {
              //       [classes.showAll]: openDesc,
              //   }
              // )}
            >
              {children}
            </Collapse>
            <CustomButtonUI
                  onClick={handlerOpenDesc}
                  color='primary'
              >
                  {!openDesc ? 'Показать больше' : 'Скрыть'}
            </CustomButtonUI>
        </Box>
      : <>{children}</>
      }
    </>
  );
};

export default React.memo(ProductShowMoreWrapper);
