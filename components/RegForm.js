import {Box, Button, InputBase, makeStyles, TextField, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '300px',
        margin: '0 auto',
        paddingTop: theme.spacing(4),
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
    text: {
        textAlign: 'center',
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
    },

}));

export default function RegForm() {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const onSubmit = data => console.log(data);


  return (
    <>
    <Box className={classes.root}>
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

                    {/* <TextField label='Имя'  
                    variant='outlined' size='small' 
                    type="text" 
                    error={false} helperText=" " />

                    <TextField label='Фамилия' 
                    variant='outlined' size='small'  
                    type="text"
                    error={false} helperText=" "
                    {...register("surname", {maxLength: 50})} />

                    <TextField label='Номер телефона'
                    variant='outlined' size='small'
                    type="tel"
                    error={false} helperText=" "
                    {...register("phonenumber", {required: true})} />

                    <TextField label='Пароль' 
                    variant='outlined' size='small'  
                    type="password"
                    error={false} helperText=" " 
                    {...register("password", {required: true, min: 3, maxLength: 50})} />

                    <TextField label='Повторите пароль' 
                    variant='outlined' size='small'  
                    type="password"
                    error={false} helperText=" "
                    {...register("reppassword", {required: true, min: 3, maxLength: 50})} /> */}

                    <Button type='submit' disabled={false} variant="contained" color="primary">Продолжить</Button>
            </form>
    </Box>
    <Typography className={classes.text} variant='subtitle1'>При регистрации вы соглашаетесь с <Link href='#' className={classes.link}>Лицензионным соглашением</Link></Typography>
    <Typography className={classes.text} variant='subtitle2'>Уже есть аккаунт?</Typography>
    <Button variant='text' size='large' color='primary'>Войти</Button>
    </>
  );
}