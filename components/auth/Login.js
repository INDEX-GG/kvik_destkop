import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  makeStyles,
  Typography,
  TextField, InputAdornment,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { DialogCTX } from "../../lib/Context/DialogCTX";
import RegForm from "./RegForm";
import { useAuth } from "../../lib/Context/AuthCTX";
import PhoneMask from "../../lib/phoneMask";
import { useMedia } from "../../hooks/useMedia";
import { useStore } from "../../lib/Context/Store";
import { getDataByPost } from "../../lib/fetch";
import DialogUIAuth from "../UI/DialogUIAuth";
import {Checkbox} from "@material-ui/core";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import FiberManualRecordSharpIcon from "@material-ui/icons/FiberManualRecordSharp";

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
  else: {
    textAlign: "center",
  },
  modalContainer: {
    textAlign: "center",
    padding: "16px 0px 27px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
  },
  socialNetworks: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-between",
    marginBottom: "12px",
    width: "60%",
  },
  passwordActionBlock: {
    display: "flex",
    justifyContent: "space-between",
    width: "auto",
  },
  rememberPasswordCheck: {
    padding: '0px',
    background: theme.palette.secondary.main,
    width: '14px',
    height: '14px',

    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
  rememberPassword: {
    color: "#C7C7C7",
    marginRight: "45px",
    background: "none",
    cursor: "pointer",
    transition: "all 200ms ease-in-out",

    "&:hover": {
      transition: "all 200ms ease-in-out",
    },
  },
  forgotPassword: {
    color: "#00A0AB",
    marginLeft: "12px",
    background: "none",
    cursor: "pointer",
    transition: "all 200ms ease-in-out",

    "&:hover": {
      transition: "all 200ms ease-in-out"
    },
  },

}));

const Login = () => {
  const { signIn } = useAuth();
  const { storeUser } = useStore();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, control, setError, setValue } = useForm();
  const {
    openRegForm,
    setOpenRegForm,
    openLoginForm,
    setOpenLoginForm,
  } = useContext(DialogCTX);
  const { matchesMobile } = useMedia();
  const onSubmit = (data) => {
    data.phone = `+${data.phone.replace(/\D+/g, "")}`;
    // console.log(data);
    getDataByPost("/api/checkUser", data).then((res) => {
      // console.log(res);
      if (res?.isset === false) {
        setError("phone", { type: "validate", message: " " });
        setError("password", {
          type: "validate",
          message: "Неверный номер или пароль",
        });
      } else {
        getDataByPost("/api/login", { id: res?.idUser }).then(() => signIn()); //session//authCtx
        storeUser(res?.idUser); //store
        setOpenLoginForm(!openLoginForm);
        setValueInp("");
        setValue("password", "");
      }
    });
  };

  const [valueInp, setValueInp] = useState("");

  return (
    <>
      <DialogUIAuth
        open={openLoginForm || false}
        onClose={() => {
          setValueInp("");
          setValue("password", "");
          setOpenLoginForm(!openLoginForm);
        }}
        title="Вход"
        fullWidth
        maxWidth="sm"
      >
        <Box className={classes.root}>
          <Box className={classes.reg}>
            {matchesMobile ? null : (
              <Typography className={classes.title} variant="h6">
                Вход
              </Typography>
            )}
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                      if (e.key == "Backspace" && e.target.value.length === 3) {
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
                  <TextField
                    label="Введите пароль"
                    variant="outlined"
                    size="small"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
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
                )}
                rules={{ required: "Введите пароль" }}
              />
              {/*<Box  className={classes.passwordActionBlock}>*/}
              {/*  <Checkbox*/}
              {/*      className={classes.rememberPasswordCheck}*/}
              {/*      icon={<FiberManualRecordOutlinedIcon/>}*/}
              {/*      checkedIcon={<FiberManualRecordSharpIcon/>}*/}
              {/*      label="Запомнить пароль"*/}
              {/*  />*/}

              {/*  <Typography className={classes.forgotPassword} variant="body2"  >*/}
              {/*    Забыли пароль?*/}
              {/*  </Typography>*/}
              {/*</Box>*/}

              <div className={classes.passwordActionBlock}>
                <Checkbox
                    className={classes.rememberPasswordCheck}
                    color="primary"
                    value=""
                    icon={<FiberManualRecordOutlinedIcon/>}
                    checkedIcon={<FiberManualRecordSharpIcon/>}
                />
                <button  className={classes.rememberPassword} >
                  Запомнить пароль
                </button>
                <button  className={classes.forgotPassword} >
                  Забыли пароль?
                </button>
              </div>

              <Button
                type="submit"
                disabled={false}
                variant="contained"
                color="primary"
              >
                Войти
              </Button>
              <Typography className={classes.else} variant="body2" >
                или
              </Typography>
              <div className={classes.socialNetworks}>
                <a href="https://vk.com" className="vkLoginIcon"/>
                <a href="https://ok.ru/" className="odLoginIcon"/>
                <a href="https://www.apple.com/" className="appleLoginIcon"/>
                <a href="https:/facebook.com" className="facebookLoginIcon"/>
                <a href="https://google.com" className="googleLoginIcon"/>
              </div>
              <Button
                onClick={() => {
                  setOpenLoginForm(!openLoginForm);
                  setOpenRegForm(!openRegForm);
                }}
                variant="text"
                size="large"
                color="primary"
              >
                Зарегистрироваться
              </Button>
            </form>
          </Box>
        </Box>
      </DialogUIAuth>
      <RegForm />
    </>
  );
};

export default Login;
