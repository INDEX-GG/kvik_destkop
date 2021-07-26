import {useContext} from 'react';
import { Box, Button, Dialog, makeStyles, TextField, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

import { DialogCTX, RegistrationCTX } from '../../lib/Context/DialogCTX';
import ConfirmNumber from './ConfirmNumber';
import PhoneMask from '../../lib/phoneMask';

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

const phoneMask = e => {
	let number = e.target.value;
	// number = number.replace(/[^0-9]/g, '');
	// const area = number.substr(0, 3),
	// 	pre = number.substr(3, 3),
	// 	tel = number.substr(6, 4);
	// if (area.length === 0) {
	// 	number = '';
	// } else if (area.length < 3 || pre.length === 0) {
	// 	number = `(${area}`;
	// } else if (area.length === 3 && pre.length < 3 || tel.length === 0) {
	// 	number = `(${area}) ${pre}`;
	// } else if (area.length === 3 && pre.length === 3) {
	// 	number = `(${area}) ${pre}-${tel}`;
	// }
	return number;
}

export default function RegForm() {
    const [sendData, setSendData] = useState({}),
        [openConfirmNum, setOpenConfirmNum] = useState(false),
        [phoneNum, setPhoneNum] = useState(),
		{openRegForm, setOpenRegForm, openLoginForm, setOpenLoginForm} = useContext(DialogCTX);

    const classes = useStyles();
    const { handleSubmit, control, watch } = useForm();
    const [valueInp, setValueInp] = useState("")
    const onSubmit = data => {
        data.phone = `+${data.phone.replace(/\D+/g, '')}`;
        console.log(data);
        setSendData(data);
        axios.post('/api/checkphone', { phone: data.phone }).then((res) => {
            // console.log(res.data)
            setPhoneNum(res.data)
			setOpenRegForm(!openRegForm);
            setOpenConfirmNum(true);
        })
    };

    return (
		<>
        <Dialog open={openRegForm} onClose={() => setOpenRegForm(!openRegForm)} fullWidth maxWidth="sm">
            <Box className={classes.root}>
                <Box className={classes.reg}>
                    <Typography className={classes.title} variant="h6">Регистрация</Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField label='Имя'
                                    variant='outlined' size='small'
                                    type="text"
                                    autoComplete="on"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error} helperText={error ? error.message : ' '} />
                            )}
                            rules={{ required: 'Введите имя' }}
                        />

                        <Controller
                            name="surname"
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField label='Фамилия'
                                    variant='outlined' size='small'
                                    type="text"
                                    autoComplete="on"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error} helperText={error ? error.message : ' '} />
                            )}
                            rules={{ required: 'Введите фамилию' }}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField label='Номер телефона'
                                    variant='outlined' size='small'
                                    type="tel"
                                    autoComplete="on"
                                    value={valueInp}
                                    onChange={e => onChange(PhoneMask(e, valueInp, setValueInp))}
                                    onKeyDown={(e) => {
											if (e.key == "Backspace" && e.target.value.length === 3) {
											setValueInp("");
											}
									}}
                                    error={!!error} helperText={error ? error.message : ' '} />
                            )}
                            rules={{ required: 'Введите номер телефона' }}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField label='Введите пароль'
                                    variant='outlined' size='small'
                                    type="password"
                                    autoComplete="on"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error} helperText={error ? error.message : ' '} />
                            )}
                            rules={{ required: 'Введите пароль' }}
                        />

                        <Controller
                            name="password_check"
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField label='Повторите пароль'
                                    variant='outlined' size='small'
                                    type="password"
                                    autoComplete="on"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error} helperText={error ? error.message : ' '} />

                            )}
                            rules={{ required: 'Повторите пароль', validate: (value) => (value === watch('password')) ? null : 'Пароли не совпадают' }}
                        />
                        <Button type='submit' disabled={false} variant="contained" color="primary">Продолжить</Button>
                    </form>
                </Box>
                <Typography variant='subtitle1'>
                    При регистрации вы соглашаетесь с
                </Typography>
                <Link href='#'>Лицензионным соглашением</Link>
                <Typography variant='subtitle2'>Уже есть аккаунт?</Typography>
                <Button onClick={() => {setOpenRegForm(!openRegForm); setOpenLoginForm(!openLoginForm)}} variant='text' size='large' color='primary'>Войти</Button>
            </Box>
        </Dialog>
		<RegistrationCTX.Provider value={{openConfirmNum, setOpenConfirmNum, phoneNum, sendData}}>
			<ConfirmNumber/>
		</RegistrationCTX.Provider>
		
		</>
    );
}