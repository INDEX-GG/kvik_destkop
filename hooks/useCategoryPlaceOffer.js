import React, { useState, useEffect } from "react";
import axios from 'axios';





export const useCategoryPlaceOffer = (data) => {
    console.log(data)
    let name = data?.toLowerCase();
    const [zxc, setZxc] = useState(undefined)

    let newOBJ = [];
    if (zxc?.length !== undefined) {
        for (var i = 0; i < zxc?.length; i++) {
            newOBJ?.push(JSON.parse(((zxc[i]?.split('"').join(''))?.split("'").join('"'))))
        }
    } else {
        newOBJ = []
    }
  
    useEffect(() => {
        if (name !== undefined) {
            axios.get(`/subcategories/` + name + `.json`)
                .then((result) => setZxc(result.data[name]))
                .catch((e) => {
                    console.log("error: " + e);
                    throw e
                })
        }
    }, [name])
    return { ...newOBJ }
}
