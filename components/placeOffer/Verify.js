import {useState, useEffect} from 'react';
import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import { Fragment } from 'react';
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

const items = ["Категория", "Описание", "Цена", "Фотографии", "Местоположение", "Контакты"];

const Verify = () => {
    const methods = useFormContext();
    const classes = useStyles();
    const [verify, setVerify] = useState(0);


    // console.log(methods.formState)

    const formVerfy = () => {
        
    }

    useEffect(() => {
        formVerfy()
    })

      return  (
        <Box className={classes.root}>
            <Box className={classes.wrapper}>
            {items.map((item, i) => {
                return (
                    <Fragment key={i}>
                        <Typography className={classes.text} color={i + 1 <= verify ? 'primary' : 'initial'}>
                            {item}
                            <ActiveIcon  Color={(i + 1 <= verify) ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
                        {(items.length !== i + 1) && <Divider className={classes.divider} style={{backgroundColor: `${(i + 2 <= verify) ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>}
                    </Fragment>
                )
            })}
            </Box>
        </Box>
        )
}

export default Verify;