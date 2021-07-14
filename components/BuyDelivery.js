import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    test: {
        color: "red"
    }
}))

function BuyDelivery({test,courier, pickup}) {
    const classes = useStyles()
    return (
        <div className="buyDilevery">
            <div classNAme="buyDileveryCircle"></div>
            <div className="buyDileveryTitle">Доставка номер один</div>
        </div>
    )
}

export default BuyDelivery