import { Controller, useFormContext } from 'react-hook-form';
import { Box, Button, Checkbox, Collapse, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import {useState} from 'react';
import Defense from '../../../UI/icons/Defense';
import Chevron from '@material-ui/icons/KeyboardArrowDownRounded';
import theme from '../../../UI/theme';

const useStyles = makeStyles((theme) => ({
    SafeDealField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    check: {
       padding: '6px',
    },
    label: {
        flexGrow: 1,
       marginLeft: theme.spacing(4),
       '& span': {
            fontSize: '14px',
       }
    },
    collapse: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    aboutf: {
        fontSize: '12px',
        color: theme.palette.grey[200],
        marginBottom: theme.spacing(1)
    },
    abouts: {
        fontSize: '12px',
        color: theme.palette.grey[300]
    },
    rotate: {
        transform: 'rotate(180deg)',
    }
 }));

const SafeDeal = () => {
    const [collapsed, setCollapsed] = useState(false);
    const classes = useStyles();
    const methods = useFormContext();
   return (
       <>
             <Box className={classes.SafeDealField}>
                <Defense Color={methods.watch('safedeal') ? theme.palette.primary.main : theme.palette.grey[400]}/>
                <Controller
                    name='safedeal'
                    control={methods.control}
                    defaultValue={false}
                    render={({ field: { onChange, value }}) => (
                        <FormControlLabel
                        className={classes.label}
                        control={
                           <Checkbox
                                 className={classes.check}
                                 color='primary'
                                 icon={<OutlinedIcon/>}
                                 checkedIcon={<Filledicon/>}
                                 checked={value}
                                 onChange={(e) => onChange(e.target.checked)}
                           />}
                        label="Безопасная сделка"
                    />
                    )}
                />
                <Button onClick={() => setCollapsed(!collapsed)} variant='text' color='primary'><Chevron className={collapsed ? classes.rotate : undefined}/>Подробнее</Button>
            </Box>
            <Collapse className={classes.collapse} in={collapsed}>
                <Typography className={classes.aboutf}>
                    Безопасная сделка — это простой и надежный способ покупать и продавать товары по всей России Безопасная сделка — это простой и надежный способ покупать и продавать товары по всей России Безопасная сделка — это простой и надежный способ покупать и продавать товары по всей России
                </Typography>
                <Typography className={classes.abouts}>
                    При оплате онлайн сразу вернем деньги, если товар не устроит. При оплате онлайн доставка от 374.70 ₽ и 1 рабочего дня При оплате онлайн сразу вернем деньги, если товар не устроит. При оплате онлайн доставка от 374.70 ₽ и 1 рабочего дня При оплате онлайн сразу вернем деньги, если товар не устроит. При оплате онлайн доставка от 374.70 ₽ и 1 рабочего дня
                </Typography >
            </Collapse>
        </>
   )
}

export default SafeDeal