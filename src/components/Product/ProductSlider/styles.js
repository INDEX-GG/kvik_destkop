import {makeStyles} from "@material-ui/core";


export const useProductSliderStyles = (isMobile) => {
    const useStyles = makeStyles((theme) => ({
        swiperContainer: {
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'column',
            order: '2',
        },
        swiperNormalSlide: {
            height: '400px',
            overflow: 'hidden',
            borderRadius: isMobile ? '8px 8px 0 0' : 'initial',
            backgroundColor: 'rgba(217, 217, 217, 0.75)',
            [theme.breakpoints.down(350)]: {
                height: '300px !important'
            }
        },
        swiperNormalSlideImg: {
            objectFit: 'contain',
            height: '400px',
            maxHeight: '400px',
            width:'100%',
            [theme.breakpoints.down(350)]: {
                height: '300px !important'
            }
        },
        swiperLittle: {
            height: '88px',
            display: !isMobile ? 'block' : 'none'
        },
        swiperLittleSlide: {
            marginBottom: '0px !important',
            '& > .swiper-wrapper > *': {
                height: '88px'
            }
        },
        swiperLittleSlideImg: {
            height: '88px !important',
            objectFit: 'cover !important',
        },
        swiperNone: {
            display: 'none !important'
        },
        sliderModal: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.85)',
        },
        sliderModalPosition: {
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: '100',
        },
        modalSliderClose: {
            cursor: 'pointer',
            width: '100%',
            '&::after': {
                content: '""',
                position: 'absolute',
                right: '5%',
                top: '20px',
                transform: 'rotate(45deg)',
                backgroundColor: '#52b9c5',
                width: '5px',
                height: '20px',
                borderRadius: '10px',
                zIndex: 100,
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                right: '5%',
                top: '20px',
                transform: 'rotate(-45deg)',
                backgroundColor: '#52b9c5',
                width: '5px',
                height: '20px',
                borderRadius: '10px',
                zIndex: 100,
            },
            [theme.breakpoints.down(1320)]: {
                '&::after': {
                    right: '15px',
                },
                '&::before': {
                    right: '15px',
                }
            }
        },
        mySwiper2: {
            '& .swiper-wrapper': {
                position: 'relative',
                alignItems: 'center',
            },
            '& .swiper-slide img': {
                objectFit: 'contain',
                width: '100%',
                height: '400px',
                maxHeight: '400px',
            },
            '& .swiper-button-prev': {
                left: '4px !important'
            },
            '& .swiper-button-next': {
                right: '4px !important'
            },
            '& .swiper-pagination ': {
                display: 'flex',
                justifyContent: 'space-between',
                position: 'absolute',
                zIndex: '2',
                bottom: '2px',
                background: 'rgba(44, 44, 44, 0.74)',
                borderRadius: '2px',
                color: '#fff',
                fontSize: '14px',
                padding: '2px 4px',
                fontWeight: '500',
            },
            '& .swiper-pagination-bullet': {
                cursor: 'pointer',
                backgroundColor: 'white',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                margin: '0 5px',
                display: 'block',
            },
            '& .swiper-pagination-bullet-active': {
                backgroundColor: '#00a0ab',
            },

            [theme.breakpoints.down(350)]: {
                '& .swiper-wrapper': {
                    height: '300px !important',
                }
            },
        },
        dotNone: {
            '& > .swiper-pagination': {
                display: 'none',
            }
        },
        navigationNone: {
            '& > .swiper-button-next, .swiper-button-prev': {
                display: 'none',
            }
        },
        opacityImage: {
            opacity: '0.5',
        }
    }));

    return useStyles();
}
