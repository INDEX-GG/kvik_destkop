import React, {useState, useMemo} from 'react';
import {Collapse, Box} from "@material-ui/core";

import CustomButtonUI from 'src/UI/UIcomponent/CustomButtonUI/CustomButtonUI'
import {useProductShowMoreWrapperStyles} from './style'
import {checkAlign, checkActiveClass} from "../../../../services/services";

/**
 * TODO: Переписать проверку на мобилку
 * @param {*} param0
 * @returns
 */
const ProductShowMoreWrapper = ({
  isMobile,
  align = 'center',
  showArrow = false,
  collapsedSize = '54px',
  textCollaps = 'Скрыть',
  textExpand = 'Показать больше',
  navMovesWithContent = true,
  children
}) => {

  const classes = useProductShowMoreWrapperStyles(align)
  const [openDesc, setOpenDesc] = useState(false)

  const locationMapArrow = useMemo(
    () => checkActiveClass(
      openDesc,
      classes.Arrow,
      [classes.ArrowActive]
    ),
    [openDesc]
  )

  const alignContentRoot = checkAlign(align)

  const handlerOpenDesc = () => {
    setOpenDesc(!openDesc)
  }

  return (
    <>
      {isMobile ?
        <Box className={classes.root} style={{alignItems: alignContentRoot}}>
            <Box className={classes.navigationBlock} style={{order: navMovesWithContent ? 2 : 1}}>
              <CustomButtonUI
                    onClick={handlerOpenDesc}
                    color='primary'
                    customRoot={classes.expandButton}
                >
                    {!openDesc ? textExpand : textCollaps}
              </CustomButtonUI>
              {showArrow && <Box component='span' className={locationMapArrow}/>}
            </Box>
            <Collapse
              in={openDesc}
              style={{
                order: navMovesWithContent ? 1 : 2,
                width: '100%',
              }}
              collapsedSize={collapsedSize}
            >
              {children}
            </Collapse>
        </Box>
      : <>{children}</>
      }
    </>
  );
};

export default React.memo(ProductShowMoreWrapper);
