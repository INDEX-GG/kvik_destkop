import {Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import Link from 'next/link';
import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    reg: {
        width: '300px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        '&>*': {
            marginBottom: theme.spacing(2),
        }
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(4),
    },
    submitNumber: {
        display: 'flex',
        padding: theme.spacing(4),
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        '&>*': {
            margin: theme.spacing(1),
        }
    },
    inputSubmit: {
        '& input': {
            textAlign: 'center',
        }
    }
}));

function PhoneNumberFormat(props) {
    const { inputRef, ...other } = props;
    return (
      <InputMask
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask="+7 (999) 999-99-99"
        maskChar= ''
      />
    );
}

export default function RegForm({Close}) {
    const [sendData, setSendData] = useState({}),
    [checkPhone, setCheckPhone] = useState(false),
    [errorVerify, setErrorVerify] = useState({error: true, message: 'Введите цифры'}),
    [phoneNum, setPhoneNum] = useState(),
    [buttonSubmit, setButtonSubmit] = useState(true),
    [login, setLogin] = useState(false);

    const classes = useStyles();
    const { handleSubmit, control, watch } = useForm();
    const onSubmit = data => {
        data.phone = `+${data.phone.replace(/\D+/g, '')}`;
        console.log(data);
        setSendData(data);
        axios.post('/api/checkphone', {phone: data.phone}).then((res) => {
           console.log(res.data)
           setPhoneNum(res.data)
           setCheckPhone(true)
        })
};

const verifyNumber = (e) => {
    if (e.target.value === String(phoneNum).slice(-4)) {
        setButtonSubmit(false);
        setErrorVerify({error: false, message: 'Код совпал'});
    } else {
        setButtonSubmit(true);
        setErrorVerify({error: true, message: 'Неверный код подтверждения'})
    }
}

const handleSubmitNumber = (e) => {
    e.preventDefault();
    axios.post('/api/setApi', sendData).then((res) => console.log(res.data));
    //Место для логики ошибок и логина
    Close();
}

  return (
    <>{checkPhone && <Box className={classes.submitNumber}>
        <Typography align='center' variant='subtitle1'>На указанный телефон будет совершен звонок. Пожалуйста введите последние 4 цифры звонящего номера в поле ниже</Typography>
        <TextField className={classes.inputSubmit} onInput={(e) => verifyNumber(e)} label='4 последние цифры' variant="outlined" size='small' type='text' error={errorVerify.error} helperText={errorVerify.message}></TextField>
        <Button disabled={buttonSubmit} variant='contained' color='primary' onClick={e => handleSubmitNumber(e)}>Подтвердить</Button>
    </Box>}
    {!checkPhone && !login && <Box className={classes.root}>
        <Box className={classes.reg}>
            <Typography  className={classes.title} variant="h6">Регистрация</Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        
                        <Controller
                        name="name"
                        control={control}
                        defaultValue=''
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField label='Имя'  
                            variant='outlined' size='small' 
                            type="text" 
                            value={value}
                            onChange={onChange}
                            error={!!error} helperText={error ? error.message : ' '} />
                        )}
                        rules={{required: 'Введите имя'}}
                        />

                        <Controller
                        name="surname"
                        control={control}
                        defaultValue=''
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField label='Фамилия'  
                            variant='outlined' size='small' 
                            type="text" 
                            value={value}
                            onChange={onChange}
                            error={!!error} helperText={error ? error.message : ' '} />
                        )}
                        rules={{required: 'Введите фамилию'}}
                        />

                        <Controller
                        name="phone"
                        control={control}
                        defaultValue=''
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField label='Номер телефона'  
                            variant='outlined' size='small' 
                            type="tel" 
                            value={value}
                            onChange={onChange}
                            InputProps={{
                                inputComponent: PhoneNumberFormat,
                            }}
                            error={!!error} helperText={error ? error.message : ' '} />
                        )}
                        rules={{required: 'Введите номер телефона'}}
                        />

                        <Controller
                        name="password"
                        control={control}
                        defaultValue=''
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField label='Введите пароль'  
                            variant='outlined' size='small' 
                            type="password" 
                            value={value}
                            onChange={onChange}
                            error={!!error} helperText={error ? error.message : ' '} />
                        )}
                        rules={{required: 'Введите пароль'}}
                        />

                        <Controller
                        name="password_check"
                        control={control}
                        defaultValue=''
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField label='Повторите пароль'  
                            variant='outlined' size='small' 
                            type="password" 
                            value={value}
                            onChange={onChange}
                            error={!!error} helperText={error ? error.message : ' '} />
                           
                        )}
                        rules={{required: 'Повторите пароль', validate: (value) => (value === watch('password')) ? null : 'Пароли не совпадают'}}
                        />
                        <Button type='submit' disabled={false} variant="contained" color="primary">Продолжить</Button>
                </form>
        </Box>
        <Typography variant='subtitle1'>
            При регистрации вы соглашаетесь с 
        </Typography>
        <Link href='#'>Лицензионным соглашением</Link>
        <Typography variant='subtitle2'>Уже есть аккаунт?</Typography>
        <Button onClick={() => setLogin(!login)} variant='text' size='large' color='primary'>Войти</Button>
    </Box>}
    {login && <Login />}
    </>
  );
}