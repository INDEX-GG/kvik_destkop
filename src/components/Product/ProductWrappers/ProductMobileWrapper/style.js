import {makeStyles} from "@material-ui/core";
// import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
    productPageModal: {
        scrollbarWidth: 'none !important',

        '& .MuiDialog-paper::-webkit-scrollbar': {
            display: 'none',
            width: '0',
        },

        '& .MuiDialog-paper::-moz-scrollbar': {
            display: 'none',
            width: '0px',
        },

        '& .MuiDialog-root::-webkit-scrollbar': {
            display: 'none',
            width: '0',
        },

        '& .MuiDialog-root::-moz-scrollbar': {
            display: 'none',
            width: '0px',
        },

        '& .MuiDialog-root, .MuiBackdrop-root, .MuiPaper-root, .MuiDialog-container': {
            scrollbarWidth: 'none !important',
        },

        '&::-webkit-scrollbar': {
            display: 'none',
            width: '0',
        },

        '&::-moz-scrollbar': {
            display: 'none',
            width: '0px',
        },
    }
}));

export const useProductMobileWrapperStyles = () => useStyles();
