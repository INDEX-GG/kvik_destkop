import React from "react"
import { useCategory } from "../../hooks/useCategory"

export default function BreadCrumbsProduct(data) {
    const {categoryMainAlias, categoriesByAlias} = useCategory()
    const aliasNamesArr = data.split(",")
    
    let aliasOne = null
    let aliasTwo = null
    let aliasThree = null
    let aliasFour = null


    for (let inner = 0; inner < aliasNamesArr.length; inner++) { 
        
        if (inner == 0) {
            aliasOne = categoryMainAlias.filter(item => item.alias === aliasNamesArr[0])
        }

        if (inner == 1) {
            aliasTwo =  categoriesByAlias(aliasNamesArr[0]).filter(item => item.alias == aliasNamesArr[inner])
        }

        if (inner == 2) {
            aliasThree =  categoriesByAlias(aliasNamesArr[0], aliasNamesArr[1]).filter(item => item.alias == aliasNamesArr[inner])
        }

        if (inner == 3) {
            aliasThree =  categoriesByAlias(aliasNamesArr[0], aliasNamesArr[1], aliasNamesArr[2]).filter(item => item.alias == aliasNamesArr[inner])
        }
    }

    return [aliasOne, aliasTwo, aliasThree, aliasFour].filter(item => item != null).map(item => item[0])
}