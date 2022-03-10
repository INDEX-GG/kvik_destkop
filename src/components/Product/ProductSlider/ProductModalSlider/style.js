import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  productSliderWrapper: {
		maxWidth: '1248px',
		width: '100%',
		maxHeight: '680px',
		display: 'flex',
		flexDirection: 'column-reverse',

    '& .swiper-pagination': {
			marginTop: '16px',
			display: 'block',
			color: 'white',
    },

    '& .swiper-button-prev, .swiper-button-next': {
			position: 'absolute',
			visibility: 'hidden',
			opacity: '0',
			top: '50%',
			height: '100%',
			background: 'hsla(0, 0%, 77%, 0.3)',
			backgroundRepeat: 'no-repeat',
			backgroundSize: '100% auto',
			backgroundPosition: 'center',
			transform: 'translateY(-50%)',
			transitionDuration: '250ms',
			transitionProperty: 'visiblity, opacity',
    },

    '& .swiper-button-prev': {
			backgroundImage: 'url(/icons/swiper/prev.svg)',

    },

    '& .swiper-button-next': {
			backgroundImage: 'url(/icons/swiper/next.svg)',

    },


    '& .swiper-button-disabled': {
			visibility: 'hidden',
			opacity: '0',
    },
  },
  productSlideWrapperPrev: {
    '& .swiper-button-prev': {
      visibility: 'visible',
      opacity: '1',
    }
  },
  productSlideWrapperNext: {
    '& .swiper-button-next': {
      visibility: 'visible',
      opacity: '1',
    }
  },
  productSliderNav: {
    marginTop: '29px',
    maxWidth: '902px',
    height: '88px',
    minHeight: '88px',

    '& .swiper-wrapper': {
      display: 'flex',
      alignItems: 'center',
      // gap: '2px',
      // padding: '0 4px',

      '& .swiper-slide': {
        width: '100px !important',
      }
    },

    [theme.breakpoints.down(1024)]: {
  		display: 'none',
    }

  },
  productSliderNavItem: {
		width: '100px',
		boxSizing: 'border-box',
		// transition: '0.2s all linear',

    '& .swiper-slide-active': {
			border: '2px solid hsl(186, 50%, 55%)',

    },
  },
  productSliderNavItemImg: {
    border: '2px solid transparent',
    width: '100%',
    height: '100%',
    borderRadius: "2px",
    maxHeight: '400px',
  },
  productSliderItem: {
    display: 'flex',
		justifyContent: 'center',
		height: 100% '!important',

    [theme.breakpoints.down(600)]: {
		  maxHeight: '300px',
    }
  },
  mySwiper: {

    '& .swiper-slide img': {
      objectFit: 'cover',
      width: '100%',
      // height: 100%,
      // border-radius: 8px,
      height: '100%',
      maxHeight: '400px',
    }
  },
  fullWidthHeight: {
    width: "100%",
    height: "100%"
  },
  objectFitContain: {
    objectFit: "contain",
  }
}));

export const useProductModalStyles = () => useStyles();
