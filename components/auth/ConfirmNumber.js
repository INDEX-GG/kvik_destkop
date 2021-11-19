import React, {useContext, useEffect, useState} from 'react'
import {Box, Button, Dialog, makeStyles, TextField, Typography} from '@material-ui/core';
import {RegistrationCTX} from '../../lib/Context/DialogCTX';
import {getDataByPost} from '../../lib/fetch';
import {useAuth} from '../../lib/Context/AuthCTX';
import {useStore} from '../../lib/Context/Store';

const useStyles = makeStyles((theme) => ({
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
  // inputSubmit: {
  // 	'& input': {
  // 		textAlign: 'center',
  // 	}
  // },
  inputSubmit1: {
    '& input': {
      textAlign: 'center',
    },
    width: "32px",
    height: "32px",
    border: "1px solid",
    borderColor: "#8F8F8F",
    boxSizing: "border-box",
    borderRadius: "8px",
    margin: "5px"
  },
  inputBlock: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    marginBottom: "22px",
    width: "60%",
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },

}));

const ConfirmNumber = () => {
  const {signIn} = useAuth();
  const {storeUser} = useStore();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [valueAll, setValueAll] = useState('');
  const classes = useStyles();
  const [errorVerify, setErrorVerify] = useState({error: true, message: 'Введите цифры'}),
    {openConfirmNum, setOpenConfirmNum, phoneNum, sendData} = useContext(RegistrationCTX);

  const regUser = () => {
    getDataByPost('/api/setApi', sendData).then((r) => {
      // console.log(r)
      switch (r?.message) {
        case 'user created':
          return (
            getDataByPost('/api/checkUser', sendData({phone: sendData.phone, password: sendData.password})).then(res => (
              getDataByPost('/api/login', {id: r.id, RefreshAuthToken: res?.RefreshAuthToken }).then(() => signIn()),	//session//authCtx
                storeUser(r.id)
            ))
            // getDataByPost('/api/login', {id: r.id}).then(() => signIn()),	//session//authCtx
            //   storeUser(r.id)								//store
          )												//Сделать модалку
        case 'user already exists':
          return alert('Вы уже зарегестрированы')
      }
    });
    setOpenConfirmNum(!openConfirmNum);
  }


  useEffect(() => {
    setValueAll(`${value1}${value2}${value3}${value4}`)
  }, [value1, value2, value3, value4]);


  const jump = (field, autoMove) => {
    if (value1.length >= 1) {
      document.getElementById(autoMove).focus();
    }
  }


  const verifyNumber = () => {
    // if (valueAll === String(phoneNum).slice(-4)) {
    // 	setErrorVerify({ error: false, message: 'Код совпал' });
    // 	regUser();
    // } else {
    // 	setErrorVerify({ error: true, message: 'Неверный код подтверждения' })
    //
    // }

    if (valueAll.length === 4) {
      getDataByPost('/api/checkphone', {"phone": phoneNum, "code": valueAll})
        .then(r => {

          if (r?.message === 'time error') {
            setErrorVerify({error: true, message: 'Превышено количество попыток, повторите позже'})
          }


          if (r?.check) {
            regUser()
          } else {
            setErrorVerify({error: true, message: 'Неверный код подтверждения'})
          }
        })
    }
  }
  return (
    <Dialog open={openConfirmNum || false} onClose={() => setOpenConfirmNum(!openConfirmNum)} fullWidth maxWidth="sm">
      <Box className={classes.submitNumber}>
        <Typography className={classes.title} variant="h6">
          Регистрация
        </Typography>
        <Typography align='center' variant='subtitle1'>На указанный телефон будет совершен звонок.<br/> Пожалуйста
          введите последние 4 цифры <br/> звонящего номера в поле ниже.</Typography>
        {/*<TextField className={classes.inputSubmit} onInput={(e) => verifyNumber(e)} label='4 последние цифры' variant="outlined" size='small' type='text' error={errorVerify.error} helperText={errorVerify.message}></TextField>*/}
        <Box className={classes.inputBlock}>
          <TextField className={classes.inputSubmit1} id="01" onKeyUp={() => jump(value1, '02')}
                     InputProps={{disableUnderline: value1.length > 0, maxLength: 1}}
                     onChange={(e) => setValue1(e.target.value)} type='text' error={errorVerify.error}
                     helperText={valueAll.length !== 4 && errorVerify.message}/>
          <TextField className={classes.inputSubmit1} id="02" onKeyUp={() => jump(value2, '03')}
                     InputProps={{disableUnderline: value2.length > 0, maxLength: 1}}
                     onChange={(e) => setValue2(e.target.value)} type='text' error={errorVerify.error}/>
          <TextField className={classes.inputSubmit1} id="03" onKeyUp={() => jump(value3, '04')}
                     InputProps={{disableUnderline: value3.length > 0, maxLength: 1}}
                     onChange={(e) => setValue3(e.target.value)} type='text' error={errorVerify.error}/>
          <TextField className={classes.inputSubmit1} id="04"
                     InputProps={{disableUnderline: value4.length > 0, maxLength: 1}}
                     onChange={(e) => setValue4(e.target.value)} type='text' error={errorVerify.error}/>
        </Box>
        <Button
          onClick={() => verifyNumber(valueAll)}
          variant="text"
          size="large"
          color="primary"
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Dialog>
  )
}

export default ConfirmNumber;