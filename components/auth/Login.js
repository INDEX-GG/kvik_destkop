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
import SelectUserForm from "./SelectUserForm";
import { useAuth } from "../../lib/Context/AuthCTX";
import PhoneMask from "../../lib/phoneMask";
import { useMedia } from "../../hooks/useMedia";
import { useStore } from "../../lib/Context/Store";
import {getDataByPost, getTokenDataByPost} from "../../lib/fetch";
import DialogUIAuth from "../UI/DialogUIAuth";
// import {Checkbox} from "@material-ui/core";
// import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
// import FiberManualRecordSharpIcon from "@material-ui/icons/FiberManualRecordSharp";
import {SecretData, SecretPassword} from "../../lib/SecretData";
import ConfirmNumber from "./ConfirmNumber";

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
    justifyContent: "flex-end",
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
  const [resetPassword , setResetPassword] = useState(false)
  const [checkSms, setCheckSms] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const { handleSubmit, control, setError, setValue, watch } = useForm();
  const {
    openRegForm,
    setOpenRegForm,
    openLoginForm,
    setOpenLoginForm,
  } = useContext(DialogCTX);
  const { matchesMobile } = useMedia();

  const onSubmit = (data) => {
    data.phone = `+${data.phone.replace(/\D+/g, "")}`;


    getDataByPost("/api/checkUser", SecretData(data)).then((res) => {
      if (res?.isset === false) {
        setError("phone", { type: "validate", message: " " });
        setError("password", {
          type: "validate",
          message: "???????????????? ?????????? ?????? ????????????",
        });
      } else {
        // getDataByPost("/api/login", { id: res?.idUser, RefreshAuthToken: res?.RefreshAuthToken }).then(() => signIn()); //session//authCtx
        signIn(res?.idUser)
        storeUser(res?.idUser); //store
        setOpenLoginForm(!openLoginForm);
        setValueInp("");
        setValue("password", "");
        onClose()
      }
    });
  };

  const onClose = () => {
    // setResetPassword(false)
    setCheckSms(false)
    setResetPassword(false);
    setChangePassword(false)
    setOpenLoginForm(false)
    setValue('checkPhone', '')
  }

  const onReset = (data) => {

    if (changePassword) {
      getTokenDataByPost('/api/settings/upPassword', SecretPassword({password: data.newPassword}), changePassword)
        .then((r) => {
          if (r?.message === 'successfully update') {
            onSubmit({phone: data.checkPhone, password: data.newPassword})
          }
        })
      return;
    }

    data.checkPhone = `+${data.checkPhone.replace(/\D+/g, "")}`

    getDataByPost('/api/callPhone', {'phone': data.checkPhone})
      .then((r) => {
        if (r?.message === 'success') {
          setCheckSms(true)
        }
      });

  }


  const handleClickResetPassword = () => {
    setResetPassword(true)
    setOpenLoginForm(false)
  }

  const [valueInp, setValueInp] = useState("");


  const ResetPassword = () => {

    if (changePassword) {
      return (
        <Box className={classes.root}>
          <Box className={classes.reg}>
            {matchesMobile ? null : (
              <Typography className={classes.title} variant="h6">
                ?????????? ????????????
              </Typography>
            )}
            <form className={classes.form} onSubmit={handleSubmit(onReset)}>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({field: {value, onChange}, fieldState: {error}}) => (
                  <TextField
                    label="?????????? ????????????"
                    variant="outlined"
                    placeholder=''
                    size="small"
                    type="password"
                    autoComplete="password"
                    value={value}
                    onChange={(e) =>
                      onChange(e.target.value)
                    }
                    error={!!error}
                  />
                )}
              />
              <ConfirmNumber/>
              <Button
                type="submit"
                disabled={false}
                variant="contained"
                color="primary"
              >
                ??????????
              </Button>
            </form>
          </Box>
        </Box>
      )
    }

    if (checkSms) {
      return (
        <ConfirmNumber
          registrantion
          resetPhone={`+${watch('checkPhone').replace(/\D+/g, "")}`}
          changePassword={setChangePassword}
          onClose={onClose}
        />
      )
    }


    return (
      <Box className={classes.root}>
        <Box className={classes.reg}>
          {matchesMobile ? null : (
            <Typography className={classes.title} variant="h6">
              ???????????????????????????? ????????????
            </Typography>
          )}
          <form className={classes.form} onSubmit={handleSubmit(onReset)}>
            <Controller
              name="checkPhone"
              control={control}
              defaultValue=""
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <TextField
                  label="?????????? ????????????????"
                  variant="outlined"
                  placeholder='+7 (_ _ _) _ _ _ - _ _ - _ _ '
                  size="small"
                  type="tel"
                  autoComplete="tel"
                  value={value}
                  onChange={(e) =>
                    PhoneMask(e, value, onChange)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && e.target.value.length === 3) {
                      setValue('checkPhone', "");
                    }
                  }}
                  autoFocus
                  inputRef={input => input && input.focus()}
                  error={!!error}
                  helperText={error ? error.message : " "}
                />
              )}
              rules={{required: "?????????????? ?????????? ????????????????"}}
            />
            <ConfirmNumber/>
            <Button
              type="submit"
              disabled={false}
              variant="contained"
              color="primary"
            >
              ????????????????????
            </Button>
          </form>
        </Box>
      </Box>
    )
  }

	return (
    <>
      {!resetPassword ?
        <DialogUIAuth
          open={openLoginForm || false}
          onClose={() => {
            setValueInp("");
            setValue("password", "");
            setOpenLoginForm(false);
          }}
          title="????????"
          fullWidth
          maxWidth="sm"
        >
          <Box className={classes.root}>
            <Box className={classes.reg}>
              {matchesMobile ? null : (
                <Typography className={classes.title} variant="h6">
                  ????????
                </Typography>
              )}
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <TextField
                      label="?????????? ????????????????"
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
                  rules={{ required: "?????????????? ?????????? ????????????????" }}
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
                      label="?????????????? ????????????"
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
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  rules={{ required: "?????????????? ????????????" }}
                />
                {/*<Box  className={classes.passwordActionBlock}>*/}
                {/*  <Checkbox*/}
                {/*      className={classes.rememberPasswordCheck}*/}
                {/*      UIicon={<FiberManualRecordOutlinedIcon/>}*/}
                {/*      checkedIcon={<FiberManualRecordSharpIcon/>}*/}
                {/*      label="?????????????????? ????????????"*/}
                {/*  />*/}

                {/*  <Typography className={classes.forgotPassword} variant="body2"  >*/}
                {/*    ???????????? ?????????????*/}
                {/*  </Typography>*/}
                {/*</Box>*/}

                <div className={classes.passwordActionBlock}>
                  {/*<Checkbox*/}
                  {/*  className={classes.rememberPasswordCheck}*/}
                  {/*  color="primary"*/}
                  {/*  value=""*/}
                  {/*  UIicon={<FiberManualRecordOutlinedIcon/>}*/}
                  {/*  checkedIcon={<FiberManualRecordSharpIcon/>}*/}
                  {/*/>*/}
                  {/*<button  className={classes.rememberPassword} >*/}
                  {/*  ?????????????????? ????????????*/}
                  {/*</button>*/}
                  <button type="button" onClick={handleClickResetPassword}  className={classes.forgotPassword} >
                    ???????????? ?????????????
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={false}
                  variant="contained"
                  color="primary"
                >
                  ??????????
                </Button>
                <Typography className={classes.else} variant="body2" >
                  ??????
                </Typography>
                <div className={classes.socialNetworks}>
                  <a href="https://vk.com" className="vkLoginIcon"/>
                  <a href="https://ok.ru/" className="odLoginIcon"/>
                  <a href="https://www.apple.com/" className="appleLoginIcon"/>
                  {/*<a href="https://facebook.com" className="facebookLoginIcon"/>*/}
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
                  ????????????????????????????????????
                </Button>
              </form>
            </Box>
          </Box>
        </DialogUIAuth> :
      <DialogUIAuth
        open={resetPassword || false}
        onClose={() => {
          setOpenLoginForm(false)
          setResetPassword(false);
        }}
        title="???????????????????????????? ????????????"
        fullWidth
        maxWidth="sm"
				extraClasses={{ root: classes.block }}>
        <ResetPassword/>
      </DialogUIAuth>}
      <RegForm />
      <SelectUserForm />
    </>
  );
};

export default Login;
