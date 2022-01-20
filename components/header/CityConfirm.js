import clsx from "clsx";
import {makeStyles, Typography, Button, Container} from "@material-ui/core"

const useStyles = makeStyles(() => ({
  confirmWrapper: {
    width: '301px',
    height: '139px',
    background: '#F7F7F7',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '8px',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonWrapper: {
    marginTop: '25px',
    // gap: '25px',
    padding: '0',
  },
  button: {
    borderRadius: '3px',
    whiteSpace: 'nowrap',
    width: 'auto',
    height: '30px',
  },
  buttonConfirm: {
    backgroundColor: '#00A0AB',
    color: '#FFFFFF',
    marginRight: '25px',
  },
  butttonSelectCity: {
    color: '#00A0AB',
  }
}))

export default function CityConfirm ({city, onConfirmCity, onSelectCity}) {
  const classes = useStyles()

  return (
    <Container className={classes.confirmWrapper}>
      <Typography sx={{ p: 2 }}>Ваш город <span style={{fontWeight: '600'}}>{city}</span> ?</Typography>
      <Container className={classes.buttonWrapper}>
        <Button className={clsx(classes.button, classes.buttonConfirm)} variant="contained" onClick={onConfirmCity}>Все верно</Button>
        <Button className={clsx(classes.button, classes.butttonSelectCity)} onClick={onSelectCity}>Выбрать город</Button>
      </Container>
    </Container>
  )
}
