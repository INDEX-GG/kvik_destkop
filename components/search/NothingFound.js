import Router from 'next/router';
import Image from "next/image"
import {Box, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {useMedia} from "../../hooks/useMedia";
import Footer2 from "../../components/Footer2"
import SearchNotFound from '#UI/icons/SearchNotFound'
import ScrollPostData from '../ScrollPostData'

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
    [theme.breakpoints.down('sm')]: {
      padding: '0 10%'
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
    width: '80%',
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
  const {matchesMobile} = useMedia();

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

        <Box className={classes.BottomBlock}>
          <Box className={classes.LeftBlock}>
						<ScrollPostData title='Рекомендуемое' url='/api/getPostsPortion' />
          </Box>
          {!matchesMobile &&
            <Box className={classes.rightBlock}>
              <Box className={classes.ad}>
                <Box className={classes.ad_background}>
                  <Image src={"/img/joker1.png"} width={224} height={480}/>
                  <Image src={"/img/joker2.png"} width={224} height={480}/>
                </Box>
              </Box>
              <Box className={classes.footer}>
                    <Footer2/>
              </Box>
            </Box>
          }
        </Box>

      </Box>
    </Box>
  )
}

export default NothingFound
