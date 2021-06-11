import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import { Fragment } from 'react';
import ActiveIcon from '../../UI/icons/ActiveIcon';

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
    divider: {
        width: '2px',
        height: '16px',
        position: 'relative',
        left: '142px',
    },  
}));

const items = ["Категория", "Параметры", "Описание", "Цена", "Фотографии", "Местоположение", "Контакты"];

const Verify = ({Verify = 0}) => {

    const classes = useStyles();

      return  (
        <Box className={classes.root}>
            {items.map((item, i) => {
                return (
                    <Fragment key={i}>
                        <Typography color={i + 1 <= Verify ? 'primary' : 'initial'}>
                            {item}
                            <ActiveIcon  Color={(i + 1 <= Verify) ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
                        {(items.length !== i + 1) && <Divider className={classes.divider} style={{backgroundColor: `${(i + 2 <= Verify) ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>}
                    </Fragment>
                )
            })}
        </Box>
        )
}

export default Verify;