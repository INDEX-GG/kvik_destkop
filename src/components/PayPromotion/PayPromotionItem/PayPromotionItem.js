import React from 'react';
import {Box} from "@material-ui/core";
import CustomCheckboxUI from "../../../UI/UIcomponent/CustomCheckboxUI";
import {usePromotionItemStyles} from "./styles";
import CustomSwitchUI from "../../../UI/UIcomponent/CustomSwitchUI";

const PayPromotionItem = ({active, formValues, reset, promotion, isMobile}) => {

    const classes = usePromotionItemStyles();
    const {img, title, subtitle, value, name, adaptiveSwitcher} = promotion
    const isSwitche = adaptiveSwitcher && isMobile

    const handleChangeActive = async () => {
        if (name === 'none') return reset({none: formValues?.none ? undefined : promotion});
        if (name === 'combo') return reset({combo: formValues?.combo ? undefined : promotion});
        if (active) await reset({...formValues, [name]: undefined})
        if (!active) await reset({...formValues, [name]: promotion, combo: undefined, none: undefined})
    }

    return (
        <>
            {!!isSwitche && (
                <CustomSwitchUI
                    handleChangeSwitch={handleChangeActive}
                    checked={!!active}
                    label={title}
                />
            )}
            {!isSwitche && (
                <Box
                    onClick={handleChangeActive}
                    className={`${classes.item} ${active ? classes.itemActive : ''}`}>
                    <Box className={classes.imgContainer}>
                        {img && (
                            <img
                                className={classes.img}
                                src={img}
                                alt='promotion-img'
                            />
                        )}
                    </Box>
                    <Box className={classes.text}>
                        <Box className={classes.top}>
                            <Box className={classes.name}>
                                <Box className={classes.checkbox}>
                                    <CustomCheckboxUI checked={!!active}/>
                                </Box>
                                <Box className={classes.itemTitle}>{title}</Box>
                            </Box>
                            {value && <Box className={classes.price}>{value} ₽</Box>}
                        </Box>
                        {subtitle && <Box className={classes.itemSubtitle}>{subtitle}</Box>}
                    </Box>
                </Box>
            )}
        </>
    );
};

export default React.memo(PayPromotionItem);
