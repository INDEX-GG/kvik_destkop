import {Box, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchNotFound from '#UI/icons/SearchNotFound'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 12px',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '84px',

    [theme.breakpoints.down('sm')]: {
      marginTop: '34px',
    }
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '21px',
    paddingBottom: '50px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 10%',
      paddingBottom: '30px',

    }
  },
  lists: {
    marginLeft: '15px',
    fontWeight: '300',
    '& li': {
      listStyle: 'outside',
    }
  },
  image_icon: {
    marginTop: '31px',
    alignSelf: 'center',
    '& svg': {
			'@media (max-width:450px)': {
				width: "87px",
				height: "120px",
			}
		}
  },
  BottomBlock: {
    display: 'flex',
    marginTop: '61px',
  },
  LeftBlock: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    }
  },
  rightBlock: {
    marginLeft: '56px',
    maxWidth: "224px",
    display: "flex",
    flexDirection: "column",
    marginTop: '40px',
  },
  rightBlockBackground: {
    boxShadow: '0px 0px 20px rgb(0 0 0 / 10%)',
  },
  ad: {
    "& > *:nth-of-type(1)": {
      marginBottom: "10px !important",
      gap: '24px'
    },
    marginBottom: "17px",
    marginTop: "15px",
  },
  ad_background: {

  },
  footer: {
    top: 'calc(100% - 205px)',
    position: 'sticky',
    width: "224px"
  }
}));

const NothingFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <Box className={classes.main}>
          <Box className={classes.mainContent}>
            <Typography variant="h6" >По вашему запросу ничего не найдено</Typography>
            <Typography variant="h6" >Попробуйте:</Typography>
            <ul className={classes.lists}>
              <li>поиск в другой категории</li>
              <li>изменить фильтр поиска</li>
            </ul>
            <Box className={classes.image_icon}>
              <SearchNotFound />
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default NothingFound
