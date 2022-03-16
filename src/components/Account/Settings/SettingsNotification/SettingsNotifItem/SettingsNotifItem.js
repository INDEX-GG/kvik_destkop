import React from 'react'
import {Box, FormControlLabel, FormGroup} from '@material-ui/core'

import {useSettingsNotifItem} from './style'
import CustomCheckboxUI from 'src/UI/UIcomponent/CustomCheckboxUI'

const SettingsNotifItem = ({title, subtitle}) => {
    const classes = useSettingsNotifItem()

    return (
        <Box className={classes.notifItem}>
            <Box className={classes.notifItemTitle}>
                <Box className={classes.title}>{title}</Box>
                <Box className={classes.subTitle}>{subtitle}</Box>
            </Box>
            <Box className={classes.checkbox}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <CustomCheckboxUI
                            />
                        }
                        label="Сайт"
                    />
                </FormGroup>
            </Box>
            <Box className={classes.checkbox}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <CustomCheckboxUI
                            />
                        }
                        label="E-mail"
                    />
                </FormGroup>
            </Box>
        </Box>
    )
}

export default React.memo(SettingsNotifItem)
