import {makeStyles} from "@material-ui/core";
// import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
    productPageModal: {
        // overflow: 'hidden',
        // msOverflowStyle: 'none',
        // overflow: '-moz-scrollbars-none',
        // 'scrollbar-width': 'none !important',
        // '&::-webkit-scrollbar': {
        //     width: '0',
        // }
    },
}));

export const useProductMobileWrapperStyles = () => useStyles();
