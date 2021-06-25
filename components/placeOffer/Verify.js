import {useState, useEffect} from 'react';
import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import ActiveIcon from '../../UI/icons/ActiveIcon';
import { useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'flex-end',
        position: 'absolute',
        left: '40px',
        top: '15px',
        '&>*': {
            textAlign: 'right',
        }
    },
    wrapper: {
        position: 'fixed',
    },
    text: {
        '&>*:first-child': {
           marginLeft: theme.spacing(1), 
        }
    },
    divider: {
        width: '2px',
        height: '16px',
        position: 'relative',
        left: '150px',
    },  
}));

const Verify = () => {
    const methods = useFormContext();
    const classes = useStyles();
    const [verifyCategory, setVerifyCategory] = useState(false);
    const [verifyDesription, setVerifyDescription] = useState(false);
    const [verifyPrice, setVerifyPrice] = useState(false);
    const [verifyPhotoes, setVerifyPhotoes] = useState(false);
    const verify = 0;

    useEffect(() => {
        setVerifyCategory(!!methods.watch('title') && !!methods.watch('category_2'));
        setVerifyDescription(verifyCategory && !!methods.watch('description'));
        setVerifyPrice(verifyDesription && !!methods.watch('price'));
        setVerifyPhotoes(verifyPrice && !!methods.watch('photoes'));
    })
    
      return  (
        <Box className={classes.root}>
            <Box className={classes.wrapper}>

                        <Typography className={classes.text} color={verifyCategory ? 'primary' : 'initial'}>
                            Категория
                            <ActiveIcon  Color={verifyCategory ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
                        <Divider className={classes.divider} style={{backgroundColor: `${(verifyDesription) ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>

                        <Typography className={classes.text} color={verifyDesription ? 'primary' : 'initial'}>
                            Описание
                            <ActiveIcon  Color={verifyDesription ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
                        <Divider className={classes.divider} style={{backgroundColor: `${verifyPrice ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>

                        <Typography className={classes.text} color={verifyPrice ? 'primary' : 'initial'}>
                            Цена
                            <ActiveIcon  Color={verifyPrice ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
                        <Divider className={classes.divider} style={{backgroundColor: `${(verifyPhotoes) ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>

                        <Typography className={classes.text} color={verifyPhotoes ? 'primary' : 'initial'}>
                            Фотографии
                            <ActiveIcon  Color={verifyPhotoes ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
                        <Divider className={classes.divider} style={{backgroundColor: `${(verify) ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>

                        <Typography className={classes.text} color={verify ? 'primary' : 'initial'}>
                            Местоположение
                            <ActiveIcon  Color={verify ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
                        <Divider className={classes.divider} style={{backgroundColor: `${(verify) ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>

                        <Typography className={classes.text} color={verify ? 'primary' : 'initial'}>
                            Контакты
                            <ActiveIcon  Color={verify ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
            </Box>
        </Box>
        )
}

export default Verify;