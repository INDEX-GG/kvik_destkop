import {Box, Button, Dialog, makeStyles, TextField, Typography } from '@material-ui/core';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

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
  const classes = useStyles();
  const { handleSubmit, control, watch } = useForm();
  const onSubmit = data => {
      data.phone = `+${data.phone.replace(/\D+/g, '')}`;
      console.log(data);
      Close();
};

  return (
    <>{<Box className={classes.root}>
        <Typography variant='subtitle1'>На указанный телефон будет совершен звонок. Пожалуйста введите последние 4 цифры звонящего номера в поле ниже</Typography>
        <TextField label='4 последние цифры' variant="outlined" size='small' type='text' error={true} helperText='Неверный код подтверждения'></TextField>
    </Box> &&
    <Box className={classes.root}>
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
        <Button variant='text' size='large' color='primary'>Войти</Button>
    </Box>}
    </>
  );
}