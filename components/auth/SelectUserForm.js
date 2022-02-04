import React, { useContext } from 'react'
import {Grid} from "@mui/material";
import {Avatar, Box, makeStyles, Typography, Button} from '@material-ui/core';

import DialogUIAuth from "../UI/DialogUIAuth";
import {DialogCTX} from "../../lib/Context/DialogCTX";
// TODO: выяснить причину warning
// import { ReactComponent as AvatarProfile } from '../../icons/personal_account.svg'
import PersonalAccount from '../../UI/icons/PersonalAccount'

const useStyles = makeStyles((theme) => ({
	block: {
		height: "100%"
	},
  root: {
    display: "flex",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  reg: {
    width: "auto",
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '11px',
    width: 'auto'
  },
  title: {
    fontWeight: '500',
    lineHeight: '28px',
    color: '#2c2c2c',
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  avatarBase: {
    width: '32px',
    height: '32px'
  },
  text: {
    fontSize: '18px',
    lineHeight: '21px',
    color: '#2c2c2c',
  }
}));

const SelectUserForm = () => {
  const {
    setOpenRegForm,
    setOpenLoginForm,
    isAlreadyExistForm,
    setIsAlreadyExistForm
  } = useContext(DialogCTX);
  const classes = useStyles();

  // закрываем текущую форму
  const closeForm = () => setIsAlreadyExistForm(prevState => !prevState)

  const handleOpenRegForm = () => {
    closeForm()
    setOpenRegForm(prevState => !prevState)
  }

  const handleOpenLogForm = () => {
    closeForm()
    setOpenLoginForm(prevState => !prevState)
  }

  return (
    <DialogUIAuth
      open={isAlreadyExistForm || false}
      onClose={() => setIsAlreadyExistForm(false)}
      fullWidth
      maxWidth="sm"
      title="Войти как"
      extraClasses={{ root: classes.block}}
    >
      <Box className={classes.root}>
        <Typography variant="h6" className={classes.title}>Войти как</Typography>

        <Box className={classes.reg}>
          <Grid
            container
            className={classes.containerRow}
          >
            <Avatar className={classes.avatarBase}>A</Avatar>
            <Button
              variant="text"
              onClick={handleOpenLogForm}
            >
              <Typography className={classes.text}>Анастасия смоленская</Typography>
            </Button>
          </Grid>

          <Grid
            container
            className={classes.containerRow}
          >
            <span className={classes.avatarBase}>
              <PersonalAccount />
            </span>
            <Button
              variant="text"
              onClick={handleOpenRegForm}
            >
              <Typography className={classes.text}>Регистрация нового профиля</Typography>
              </Button>
          </Grid>
        </Box>
      </Box>
    </DialogUIAuth>
  )
}

export default SelectUserForm
