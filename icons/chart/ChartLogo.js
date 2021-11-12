import React from 'react';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    chart:  {
        stroke:"#C7C7C7",
        fill: "#C7C7C7",
     "&:hover":  {
        fill: "#007077",
        stroke: "#007077"
     }},
    svg: {
        path: {
            fill: "inherit",
            stroke: "inherit",
            strokeWidth:"inherit",
        },
    }
}));

const ChartLogo = () => {

    const classes = useStyles();

    return (
        <svg className={classes.chart} width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.27832" y="15.7933" width="3.9549" height="7.20668" />
            <rect x="7.86133" y="11.4301" width="4.19378" height="11.5699" />
            <rect x="14.6035" y="12.7783" width="4.06107" height="10.2217" />
            <rect x="21.2388" y="8.7337" width="3.98144" height="14.2663" />
            <path d="M9.89188 4.99554L1 13.3543L1.57067 13.9303L9.89188 5.87799L16.5807 9.35876L22.6458 3.64735L25.1143 5.87799V1H19.6066L21.8627 3.23064L16.2887 8.31698L9.89188 4.99554Z"  />
        </svg>

    );
};

export default ChartLogo;
