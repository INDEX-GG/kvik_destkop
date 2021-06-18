import { Box, Button, makeStyles, Typography, TextField } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import axios from 'axios';

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

const Login = ({Close}) => {

    const classes = useStyles();
    const { handleSubmit, control } = useForm();
    const onSubmit = data => {
        data.phone = `+${data.phone.replace(/\D+/g, '')}`;
        console.log(data);
        axios.post('/api/checkUser', data).then((res) => {
            console.log(res.data);
            //Сделать отладку ошибок
            const user = { isAuth: true, id: res.data.idUser }
            console.log(user);
            axios.post('api/login', user).then(res=>console.log(res))
            // Close();
        })
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.reg}>
                <Typography className={classes.title} variant="h6">Вход</Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                    <Button type='submit' disabled={false} variant="contained" color="primary">Войти</Button>
                </form>
            </Box>
        </Box>
    )
}

export default Login;