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
  modalContainer: {
    textAlign: "center",
    padding: "16px 0px 27px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
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
              <Button
                type="submit"
                disabled={false}
                variant="contained"
                color="primary"
              >
                Войти
              </Button>
              <Typography className={classes.title} >
                или
              </Typography>
                <a className="socialNetworksIco"></a>

              <Button
                onClick={() => {
                  setOpenLoginForm(!openLoginForm);
                  setOpenRegForm(!openRegForm);
                }}
                variant="text"
                size="large"
                color="primary"
              >
                Регистрация
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
