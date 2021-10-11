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

const Verify = ({edit}) => {
    const methods = useFormContext();
    const classes = useStyles();
    const [alias, setAlias] = useState(false);
    const [verifyCategory, setVerifyCategory] = useState(false);
    const [verifyTilte, setVerifyTilte] = useState(false);
    const [verifyDesription, setVerifyDescription] = useState(false);
    const [verifyPrice, setVerifyPrice] = useState(false);
    const [verifyPhotoes, setVerifyPhotoes] = useState(false);
    const [verifyLocation, setVerifyLocation] = useState(false);
    const [verifyContacts, setVerifyContacts] = useState(false);
    const [showCategory, setShowCategory] = useState(false);

    // проверка был переход из страницы редактирования или нет
    useEffect(() => {
        edit ? setShowCategory(true) : setShowCategory(false)
    }, [edit]);



    useEffect(() => {
        setVerifyTilte(!!methods.watch('title'));
        setVerifyCategory(alias);


        if (alias === "auto"){
            if (!!methods.watch("description") === true){
                if(!!methods.watch("color") === true){
                    setVerifyDescription(validateAuto())
                }
            }
        } else {
            setVerifyDescription(!!methods.watch("description"))
        }
        
        
        setVerifyPrice(!!methods.watch('price'));
        edit ? setVerifyPhotoes(true) : setVerifyPhotoes(!!methods.watch('photoes'));
        setVerifyLocation(!!methods.watch('location'));
        setVerifyContacts(!!methods.watch('contact') && (!!methods.watch('bymessages') || !!methods.watch('byphone')) );
    })
    useEffect(() => {
        if (methods?.watch('alias4') && (methods.control._fields === undefined ? methods.control.fieldsRef.current.alias4?._f.value !== '' : methods.control._fields.alias4?._f.value !== '')) {
            setAlias(methods?.watch('alias4'));
        } else if (methods?.watch('alias3') && (methods.control._fields === undefined ? methods.control.fieldsRef.current.alias4?._f.name === undefined : methods.control._fields.alias4?._f.name === undefined)) {
            setAlias(methods?.watch('alias3'));
        } else if (methods?.watch('alias2') && (methods.control._fields === undefined ? methods.control.fieldsRef.current.alias3?._f.name === undefined : methods.control._fields.alias3?._f.name === undefined)) {
            setAlias(methods?.watch('alias2'));
        } else {
            setAlias(false);
        }
    }, [methods?.watch('alias4'), methods?.watch('alias3'), methods?.watch('alias2')]);

    const reqAutoFields = ["type_park_auto", "vine","modelsAuto","submodels","generation","modification", "mileage","owners_of_pts","documents","condition","exchange_is_possible","status","steering_wheel", "color"];
    const validateAuto = () => {
        for (let field of reqAutoFields){
            if(!methods.watch(field)) return false
        }
        return true
    }
    

    
      return  (
        <Box className={classes.root}>
            <Box className={classes.wrapper}>

                        <Typography className={classes.text} color={verifyTilte ? 'primary' : 'initial'}>
                            Название
                            <ActiveIcon  Color={verifyTilte ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
                        <Divider className={classes.divider} style={{backgroundColor: `${(verifyTilte) ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>

                {!showCategory && <Typography className={classes.text} color={verifyCategory ? 'primary' : 'initial'}>
                            Категория
                            <ActiveIcon  Color={verifyCategory ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography> }
                {!showCategory && <Divider className={classes.divider} style={{backgroundColor: `${(verifyDesription) ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>}

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


                        <Divider className={classes.divider} style={{backgroundColor: `${(verifyLocation) ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>

                        <Typography className={classes.text} color={verifyLocation ? 'primary' : 'initial'}>
                            Местоположение
                            <ActiveIcon  Color={verifyLocation ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
                        <Divider className={classes.divider} style={{backgroundColor: `${(verifyContacts) ? '#00a0ab' : '#c7c7c7'}` }} orientation="vertical"/>

                        <Typography className={classes.text} color={verifyContacts ? 'primary' : 'initial'}>
                            Контакты
                            <ActiveIcon  Color={verifyContacts ? '#00a0ab' : '#c7c7c7'}/>
                        </Typography>
            </Box>
        </Box>
        )
}

export default Verify;
