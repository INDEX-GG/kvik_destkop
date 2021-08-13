import React, { useState, useEffect } from "react";
import axios from 'axios';

export const useCategoryPlaceOffer = (data) => {

    const [zxc, setZxc] = useState(undefined),
        name = data?.toLowerCase();

    let newOBJ = [];

    if (zxc?.length != undefined) {
        for (var i = 0; i < zxc?.length; i++) {
            newOBJ?.push(JSON.parse(((zxc[i]?.split('"').join(''))?.split("'").join('"'))))
        }
    } else {
        newOBJ = undefined
    }

    useEffect(() => {
        if (name !== undefined && name !== 'undefined') {
            axios.get(`/subcategories/` + name + `.json`)
                .then((result) => setZxc(result.data[name]))
                .catch((e) => {
                    setZxc()
                })
        } else {
            setZxc()
        }
    }, [name])

    return { ...newOBJ }
}
