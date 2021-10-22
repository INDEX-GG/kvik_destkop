import React, { useContext } from "react";
import {
  Box,
  Button, InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DialogCTX, RegistrationCTX } from "../../lib/Context/DialogCTX";
import ConfirmNumber from "./ConfirmNumber";
import PhoneMask from "../../lib/phoneMask";
import { useMedia } from "../../hooks/useMedia";
import { getDataByPost } from "../../lib/fetch";
import DialogUIAuth from "../UI/DialogUIAuth";
import PasswordStrengthBar from 'react-password-strength-bar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  reg: {
    width: "300px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "&>*": {
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  submitNumber: {
    display: "flex",
    padding: theme.spacing(4),
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    "&>*": {
      margin: theme.spacing(1),
    },
  },
  inputSubmit: {
    "& input": {
      textAlign: "center",
    },
  },
  modalContainer: {
    textAlign: "center",
    padding: "16px 0px 27px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
  }
}));

export default function RegForm() {
  const [sendData, setSendData] = useState({}),
    [openConfirmNum, setOpenConfirmNum] = useState(false),
    [phoneNum, setPhoneNum] = useState(''),
    {
      openRegForm,
      setOpenRegForm,
      openLoginForm,
      setOpenLoginForm,
    } = useContext(DialogCTX);

  const classes = useStyles();
  const { handleSubmit, control, setValue } = useForm();
  const { matchesMobile } = useMedia();
  const [showPassword, setShowPassword] = useState(false);

  const [valueInp, setValueInp] = useState("");
  const closeRegForm = () => {
    setValue("name", "");
    setValue("surname", "");
    setValue("phone", "");
    setValue("password", "");
    setOpenRegForm((p) => !p);
  };



  const onSubmit = (data) => {
    data.phone = `+${valueInp.replace(/\D+/g, "")}`;
    setSendData(data);
    getDataByPost("/api/checkphone", { phone: data.phone }).then((res) => {
      setPhoneNum(res);
      closeRegForm();
      setOpenConfirmNum(true);
    });
  };

  return (
    <>
      <DialogUIAuth
        open={openRegForm || false}
        onClose={() => closeRegForm()}
        fullWidth
        maxWidth="sm"
        title="Регистрация"
      >
        <Box className={classes.root}>
          <Box className={classes.reg}>
            {matchesMobile ? null : (
              <Typography className={classes.title} variant="h6">
                Регистрация
              </Typography>
            )}
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Имя"
                    variant="outlined"
                    size="small"
                    type="text"
                    autoComplete="given-name"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : " "}
                  />
                )}
                rules={{ required: "Введите имя" }}
              />
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <TextField
                    label="Номер телефона"
                    variant="outlined"
                    size="small"
                    type="tel"
                    autoComplete="tel"
                    value={valueInp}
                    onChange={(e) =>
                      onChange(PhoneMask(e, valueInp, setValueInp))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && e.target.value.length === 3) {
                        setValueInp("");
                      }
                    }}
                    error={!!error}
                    helperText={error ? error.message : " "}
                  />
                )}
                rules={{ required: "Введите номер телефона" }}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                    <>
                      <TextField
                          label="Введите пароль "
                          variant="outlined"
                          size="small"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <a
                                        className={!showPassword ? "pDPassInputWrapperInv" : "pDPassInputWrapperVis"}
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                    ></a>
                                </InputAdornment>
                            )
                          }}
                      />
                      {value.length > 0 && <PasswordStrengthBar
                          shortScoreWord={''}
                          barColors={['#C7C7C7', '#F44545', '#F44545', '#00A0AB', '#00A0AB']}
                          scoreWords={['Короткий', 'Короткий', 'Очень простой', 'Хороший', 'Надёжный']}
                          password={value}/>}
                    </>


                )}
                rules={{ required: "Введите пароль" }}
              />

              <Button
                type="submit"
                disabled={false}
                variant="contained"
                color="primary"
              >
                Продолжить
              </Button>
            </form>
          </Box>
          <Typography variant="subtitle1">
            При регистрации вы соглашаетесь с
              <Link href="#" className>Лицензионным соглашением</Link>
          </Typography>

          <Typography variant="subtitle2">Уже есть аккаунт?</Typography>
          <Button
            onClick={() => {
              closeRegForm();
              setOpenLoginForm(!openLoginForm);
            }}
            variant="text"
            size="large"
            color="primary"
          >
            Войти
          </Button>
        </Box>
      </DialogUIAuth>
      <RegistrationCTX.Provider
        value={{ openConfirmNum, setOpenConfirmNum, phoneNum, sendData }}
      >
        <ConfirmNumber />
      </RegistrationCTX.Provider>
    </>
  );
}


